from django.contrib.auth import login, logout, authenticate
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class Sign_up(APIView):
    def post(self, request):
    # Make a copy of the request data to modify
        data = request.data.copy()
        data["username"] = request.data.get("email")  # Ensure 'email' is in request.data
        # data["display_name"] = request.data.get("display_name")
        
        # Validate and create user
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()  # Create user through serializer
            user.set_password(data.get("password"))
            user.save()
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)  # Generate token
            
            return Response(
                {"token": token.key, "user": serializer.data},
                status=HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            user_data = UserSerializer(user).data
            return Response({"token": token.key, "user": user_data})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(TokenReq):

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=HTTP_200_OK)
    
class Log_out(TokenReq):

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class Master_Sign_Up(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = request.data.get("email")
        master_user = User.objects.create_user(**data)
        master_user.is_staff = True
        master_user.is_superuser = True
        master_user.save()
        token = Token.objects.create(user=master_user)
        return Response(
            {"master_user": master_user.email, "token": token.key}, status=HTTP_201_CREATED
        )