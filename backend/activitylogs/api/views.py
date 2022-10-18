from rest_framework import viewsets

from activitylogs.api.serializers import PostSerializer
from activitylogs.models import Post


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
