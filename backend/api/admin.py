from django.contrib import admin
from .models import User, TherapistProfile, Appointment, Message, MoodEntry, SelfAssessment, Resource

admin.site.register(User)
admin.site.register(TherapistProfile)
admin.site.register(Appointment)
admin.site.register(Message)
admin.site.register(MoodEntry)
admin.site.register(SelfAssessment)
admin.site.register(Resource)
