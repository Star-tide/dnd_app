from rest_framework import serializers
from .models import User
from character_app.serializers import CharacterSerializer

class UserSerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'display_name', 'username', 'characters']  # Include the fields you want to serialize