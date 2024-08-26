# campaign/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Campaign
from .serializers import CampaignSerializer

class CampaignList(APIView):
    def get(self, request):
        campaigns = Campaign.objects.all()
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CampaignDetails(APIView):
    def get_object(self, pk):
        try:
            return Campaign.objects.get(pk=pk)
        except Campaign.DoesNotExist:
            return None

    def get(self, request, pk):
        campaign = self.get_object(pk)
        if campaign is None:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CampaignSerializer(campaign)
        return Response(serializer.data)

    def put(self, request, pk):
        campaign = self.get_object(pk)
        if campaign is None:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CampaignSerializer(campaign, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        campaign = self.get_object(pk)
        if campaign is None:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        campaign.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

