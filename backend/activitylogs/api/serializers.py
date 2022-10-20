from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from activitylogs.models import Post


class PostSerializer(serializers.ModelSerializer):
    likes = serializers.IntegerField(default=0)
    current_user_likes = serializers.IntegerField(default=0)

    class Meta:
        model = Post
        fields = ("id", "title", "description", "image_src", "likes", "current_user_likes")


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.only("username"))])
    repeated_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "password", "repeated_password")

    def validate(self, attrs):
        password = attrs.get("password")
        repeated_password = attrs.pop("repeated_password")
        if password != repeated_password:
            raise ValidationError({"repated_password": "The repeated password does not match."})
        return attrs

    def save(self, **kwargs):
        return User.objects.create_user(**self.validated_data)
