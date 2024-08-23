from django.urls import path
from .views import Gemini

urlpatterns = [
    path('prompt/', Gemini.as_view(), name='gemini'),
]