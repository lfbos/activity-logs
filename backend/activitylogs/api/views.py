from django.db.models import Count, Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from activitylogs.api.serializers import PostSerializer
from activitylogs.models import Post, ActivityLog


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.annotate(
        likes=Count(
            "actions",
            distinct=True,
            filter=Q(actions__interaction_type=ActivityLog.InteractionType.LIKE),
        )
    )
