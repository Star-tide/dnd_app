from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Character, Spell
from django.conf import settings

class AddCharacterView(APIView):
    def post(self, request):
        try:
            data = request.data

            # Extract the data from the request
            name = data.get('name')
            level = data.get('level', 1)  # Default level is 1 if not provided
            character_class = data.get('character_class')
            bio = data.get('bio', '')
            spells = data.get('spells', [])  # Expecting a list of spell IDs

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
                bio=bio
            )

            # Add spells to the character
            for spell_id in spells:
                try:
                    spell = Spell.objects.get(id=spell_id)
                    character.spells.add(spell)
                except Spell.DoesNotExist:
                    return Response({"error": f"Spell with id {spell_id} does not exist."},
                                    status=status.HTTP_400_BAD_REQUEST)

            # Save the character
            character.save()

            return Response({"message": "Character created successfully!"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

