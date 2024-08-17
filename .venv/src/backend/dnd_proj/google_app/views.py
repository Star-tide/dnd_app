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
from django.http import JsonResponse

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

        model = genai.GenerativeModel('gemini-1.5-flash')

        prompt = request.query_params.get("prompt")  # Use query parameters for GET requests
        if not prompt:
            return JsonResponse({"error": "Prompt is required"}, status=400)

        try:
            response = model.generate_content(prompt)
            return JsonResponse({"reply": response.text}, status=HTTP_200_OK)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


