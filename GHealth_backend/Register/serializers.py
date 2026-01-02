from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "name", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}  # Ensure password is write-only
        }

    def create(self, validated_data):
        # Hash the password before saving
        password = validated_data.pop("password")
        user = CustomUser(**validated_data)
        user.password = make_password(password)
        user.save()
        return user
