from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework_swagger.views import get_swagger_view

from activitylogs.api.views import RegisterAPIView

schema_view = get_swagger_view(title='Activity Logs API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/doc/', schema_view),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("api/register/", RegisterAPIView.as_view()),
    path('api/activity-logs/', include("activitylogs.api.urls"))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
