# campaign/models.py
from django.db import models
from django.conf import settings

class Campaign(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='campaigns')
    title = models.CharField(max_length=100)
    short_description = models.TextField()
    difficulty_level = models.CharField(max_length=10)

    def __str__(self):
        return self.title
