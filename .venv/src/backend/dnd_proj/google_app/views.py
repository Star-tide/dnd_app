from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

#Needed for grabbing env variables
from dotenv import load_dotenv
import os

#Gemini docs to include
import google.generativeai as genai

# Google Gemini API view

class Gemini(APIView):
    def get(self, request):
        load_dotenv()
        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=GOOGLE_API_KEY)

        # use googles model
        #Add this to the model params if you want json only
        #   generation_config={"response_mime_type": "application/json"}
        model = genai.GenerativeModel('gemini-1.5-flash')

        response = model.generate_content(request.data.get("prompt"))

        return Response({response.text}, status=HTTP_200_OK)


