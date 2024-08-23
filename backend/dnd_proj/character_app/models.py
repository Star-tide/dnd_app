from django.db import models
from django.conf import settings

class Spell(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Character(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='characters')
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=1)
    character_class = models.CharField(max_length=50)
    bio = models.TextField()
    hit_dice = models.IntegerField(default=1)
    spells = models.ManyToManyField(Spell, related_name='characters')

    def __str__(self):
        return self.name