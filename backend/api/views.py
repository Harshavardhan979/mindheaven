from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, TherapistProfile, Appointment, Message, MoodEntry, SelfAssessment, Resource
from .serializers import (
    UserSerializer, TherapistProfileSerializer, TherapistProfileCreateSerializer,
    AppointmentSerializer, MessageSerializer, MoodEntrySerializer,
    SelfAssessmentSerializer, ResourceSerializer, CustomTokenObtainPairSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

from django.db.models import Q

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class TherapistProfileViewSet(viewsets.ModelViewSet):
    queryset = TherapistProfile.objects.all()
    serializer_class = TherapistProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        if request.user.role != 'THERAPIST':
            return Response({'error': 'Only therapists can create profiles'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = TherapistProfileCreateSerializer(data=request.data)
        if serializer.is_valid():
            profile = TherapistProfile.objects.create(user=request.user, **serializer.validated_data)
            return Response(TherapistProfileSerializer(profile).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'PATIENT':
            return Appointment.objects.filter(patient=user)
        elif user.role == 'THERAPIST':
            try:
                profile = TherapistProfile.objects.get(user=user)
                return Appointment.objects.filter(therapist=profile)
            except TherapistProfile.DoesNotExist:
                return Appointment.objects.none()
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        appointment = self.get_object()
        user = request.user
        if user.role != 'THERAPIST' or appointment.therapist.user != user:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        new_status = request.data.get('status')
        if new_status in ['CONFIRMED', 'REJECTED']:
            appointment.status = new_status
            appointment.save()
            return Response({'status': 'Status updated'})
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(Q(sender=user) | Q(receiver=user)).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class MoodEntryViewSet(viewsets.ModelViewSet):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MoodEntry.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SelfAssessmentViewSet(viewsets.ModelViewSet):
    queryset = SelfAssessment.objects.all()
    serializer_class = SelfAssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SelfAssessment.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all().order_by('-created_at')
    serializer_class = ResourceSerializer
    permission_classes = [permissions.AllowAny]
