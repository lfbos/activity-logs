from django.contrib import admin

from userlogs.models import Post, ActivityLog

admin.site.register(Post)
admin.site.register(ActivityLog)
