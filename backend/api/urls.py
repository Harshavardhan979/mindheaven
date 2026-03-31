from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserViewSet, TherapistProfileViewSet, AppointmentViewSet,
    MessageViewSet, MoodEntryViewSet, SelfAssessmentViewSet, ResourceViewSet,
    CustomTokenObtainPairView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'therapists', TherapistProfileViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'moods', MoodEntryViewSet)
router.register(r'assessments', SelfAssessmentViewSet)
router.register(r'resources', ResourceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
