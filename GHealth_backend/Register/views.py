from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from .models import CustomUser

@api_view(["POST"])
def RegisterView(request):
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        # Check if email already exists
        if CustomUser.objects.filter(email=serializer.validated_data["email"]).exists():
            return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)