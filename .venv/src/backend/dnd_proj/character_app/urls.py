from django.urls import path
from .views import AddCharacterView

urlpatterns = [
    path('', AddCharacterView.as_view(), name='add_character'),
    path('<int:pk>/', AddCharacterView.as_view(), name='character-detail')
    # other URL patterns
]