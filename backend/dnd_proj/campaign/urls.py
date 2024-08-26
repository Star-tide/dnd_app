from django.urls import path
from .views import CampaignList, CampaignDetails

urlpatterns = [
    path('', CampaignList.as_view(), name='campaign-list-create'),
    path('<int:pk>/', CampaignDetails.as_view(), name='campaign-detail'),
]
