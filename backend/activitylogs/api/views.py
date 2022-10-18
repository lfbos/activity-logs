from django.db.models import Count, Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from activitylogs.api.serializers import PostSerializer
from activitylogs.models import Post, ActivityLog


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Post.objects.annotate(
            likes=Count(
                "actions",
                distinct=True,
                filter=Q(actions__interaction_type=ActivityLog.InteractionType.LIKE),
            ),
            current_user_likes=Count(
                "actions",
                distinct=True,
                filter=Q(actions__interaction_type=ActivityLog.InteractionType.LIKE) &
                       Q(actions__user=user),
            )
        )
