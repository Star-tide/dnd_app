from rest_framework import serializers
from .models import Character, Spell

class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spell
        fields = ['id', 'name', 'description']

class CharacterSerializer(serializers.ModelSerializer):
    spells = SpellSerializer(many=True)  # This will serialize the list of spells

    class Meta:
        model = Character
        fields = ['id', 'name', 'level', 'spells']