from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(
        choices = ["client", "contractor"],
        default = "client"
    )

    class Meta:
        model = User
        fields = ["email", "password", "role"]

    def create(self, validated_data):
        role = validated_data.pop("role", "client")

        user = User(
            email=validated_data["email"],
            role=role
        )
        user.set_password(validated_data["password"])  #  важно!
        user.save()
        return user