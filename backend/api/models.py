from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('PATIENT', 'Patient'),
        ('THERAPIST', 'Therapist'),
        ('ADMIN', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='PATIENT')

    def __str__(self):
        return f"{self.username} ({self.role})"

class TherapistProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='therapist_profile')
    specialization = models.CharField(max_length=255)
    experience_years = models.IntegerField(default=0)
    availability = models.TextField(blank=True, null=True, help_text="e.g. Mon-Fri 9AM-5PM")

    def __str__(self):
        return f"Dr. {self.user.get_full_name()} - {self.specialization}"

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('REJECTED', 'Rejected'),
    )
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_appointments')
    therapist = models.ForeignKey(TherapistProfile, on_delete=models.CASCADE, related_name='therapist_appointments')
    date_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appt: {self.patient.username} with {self.therapist.user.username} on {self.date_time}"

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender} to {self.receiver} @ {self.timestamp}"

class MoodEntry(models.Model):
    MOOD_CHOICES = (
        ('VERY_SAD', 'Very Sad'),
        ('SAD', 'Sad'),
        ('NEUTRAL', 'Neutral'),
        ('HAPPY', 'Happy'),
        ('VERY_HAPPY', 'Very Happy'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mood_entries')
    mood = models.CharField(max_length=20, choices=MOOD_CHOICES)
    notes = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.mood} on {self.date}"

class SelfAssessment(models.Model):
    ASSESSMENT_TYPES = (
        ('ANXIETY', 'Anxiety'),
        ('STRESS', 'Stress'),
        ('DEPRESSION', 'Depression'),
    )
    RESULT_CHOICES = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assessments')
    type = models.CharField(max_length=20, choices=ASSESSMENT_TYPES)
    score = models.IntegerField()
    result = models.CharField(max_length=20, choices=RESULT_CHOICES)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.type} ({self.result})"

class Resource(models.Model):
    CATEGORY_CHOICES = (
        ('MEDITATION', 'Meditation'),
        ('STRESS_MANAGEMENT', 'Stress Management'),
        ('MOTIVATIONAL', 'Motivational'),
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
