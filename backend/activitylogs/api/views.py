from rest_framework.generics import GenericAPIView

from activitylogs.api.serializers import PostSerializer
from activitylogs.models import Post


class PostAPIView(GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
