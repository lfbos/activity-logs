from rest_framework import serializers

from activitylogs.models import Post


class PostSerializer(serializers.ModelSerializer):
    likes = serializers.IntegerField(default=0)

    class Meta:
        model = Post
        fields = ("id", "title", "description", "image_src", "likes")
