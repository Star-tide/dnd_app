from django.urls import path
from .views import Gemini

urlpatterns = [
    path('gemini/', Gemini.as_view(), name='gemini'),
]