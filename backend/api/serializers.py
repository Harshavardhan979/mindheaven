from rest_framework import serializers
from .models import User, TherapistProfile, Appointment, Message, MoodEntry, SelfAssessment, Resource
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)

class TherapistProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TherapistProfile
        fields = '__all__'

class TherapistProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TherapistProfile
        fields = ['specialization', 'experience_years', 'availability']

class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.username', read_only=True)
    therapist_name = serializers.CharField(source='therapist.user.username', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['patient', 'status']

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)

    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['sender']

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = '__all__'
        read_only_fields = ['user']

class SelfAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelfAssessment
        fields = '__all__'
        read_only_fields = ['user', 'result']

    def create(self, validated_data):
        score = validated_data.get('score', 0)
        if score < 10:
            result = 'LOW'
        elif score < 20:
            result = 'MEDIUM'
        else:
            result = 'HIGH'
        validated_data['result'] = result
        return super(SelfAssessmentSerializer, self).create(validated_data)

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'
