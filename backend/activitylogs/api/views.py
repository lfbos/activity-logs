from django.db.models import Count, Q
from rest_framework import viewsets

from activitylogs.api.serializers import PostSerializer
from activitylogs.models import Post, ActivityLog


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.annotate(
        likes=Count(
            "actions",
            distinct=True,
            filter=Q(actions__interaction_type=ActivityLog.InteractionType.LIKE),
        )
    )
    serializer_class = PostSerializer
