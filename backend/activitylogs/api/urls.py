from django.urls import path

from activitylogs.api.views import PostAPIView

urlpatterns = [
    path("posts/", PostAPIView.as_view()),
]
