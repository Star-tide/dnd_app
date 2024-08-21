from django.urls import path
from .views import AddCharacterView

urlpatterns = [
    path('/add-character/', AddCharacterView.as_view(), name='add_character'),
    # other URL patterns
]