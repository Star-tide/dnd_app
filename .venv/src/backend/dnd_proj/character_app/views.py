from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Character, Spell
from django.conf import settings
from .serializers import CharacterSerializer

class AddCharacterView(APIView):
    def get(self, request):
        try:
            # Get all characters for the authenticated user
            characters = Character.objects.filter(user=request.user)

            # Serialize the characters
            serializer = CharacterSerializer(characters, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        try:
            data = request.data

            # Extract the data from the request
            name = data.get('name')
            level = data.get('level', 1)  # Default level is 1 if not provided
            character_class = data.get('character_class')
            bio = data.get('bio', '')
            hit_dice = data.get("hit_dice")

            # Validate the required fields
            if not name or not character_class:
                return Response({"error": "Name and character_class are required fields."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Create the character associated with the current user
            character = Character.objects.create(
                user=request.user,
                name=name,
                level=level,
                character_class=character_class,
                bio=bio,
                hit_dice = hit_dice
            )

            # Save the character
            character.save()

            return Response({"message": "Character created successfully!"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk=None):
        try:
            # Ensure the character ID is provided
            if pk is None:
                return Response({"error": "Character ID is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve the character based on the provided ID
            try:
                character = Character.objects.get(id=pk, user=request.user)
            except Character.DoesNotExist:
                return Response({"error": "Character not found."}, status=status.HTTP_404_NOT_FOUND)

            # Delete the character
            character.delete()

            return Response({"message": "Character deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)