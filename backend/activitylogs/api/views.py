from django.contrib.auth.models import User
from django.db.models import Count, Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from activitylogs.api.serializers import PostSerializer, RegisterSerializer
from activitylogs.models import Post, ActivityLog


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination

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

    @action(
        detail=False,
        permission_classes=(IsAuthenticated,),
        methods=("get",)
    )
    def stats(self, request):
        data = {
            "registered_users": self._registered_users(),
            "top_most_viewed": self._top_posts(ActivityLog.InteractionType.VIEW),
            "top_most_liked": self._top_posts(ActivityLog.InteractionType.LIKE)
        }
        return Response(data)

    @action(
        detail=True,
        permission_classes=(IsAuthenticated,),
        methods=("post",)
    )
    def like(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        user = request.user
        if not post.actions.filter(
                user=user, interaction_type=ActivityLog.InteractionType.LIKE).exists():
            ActivityLog.objects.create(
                user=user,
                post=post,
                interaction_type=ActivityLog.InteractionType.LIKE
            )

        return Response()

    @action(
        detail=True,
        permission_classes=(IsAuthenticated,),
        methods=("post",)
    )
    def view(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        user = request.user
        ActivityLog.objects.create(
            user=user,
            post=post,
            interaction_type=ActivityLog.InteractionType.VIEW
        )

        return Response()

    def _registered_users(self):
        return User.objects.count()

    def _top_posts(self, interaction_type, top=5):
        posts = Post.objects.annotate(
            total=Count(
                "actions",
                distinct=True,
                filter=Q(actions__interaction_type=interaction_type)
            )
        ).order_by('-total')[:top]
        return posts.values('title', 'total')


class RegisterAPIView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({"message": f"New user {user.username} registered successfully"})
