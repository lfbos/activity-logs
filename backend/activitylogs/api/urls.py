from django.conf import settings
from django.urls import path, include
from rest_framework import routers

from activitylogs.api.views import PostViewSet

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r"posts", PostViewSet, basename="posts")

urlpatterns = [
    path("", include(router.urls)),
]
