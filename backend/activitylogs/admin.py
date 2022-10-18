from django.contrib import admin

from activitylogs.models import Post, ActivityLog

admin.site.register(Post)
admin.site.register(ActivityLog)
