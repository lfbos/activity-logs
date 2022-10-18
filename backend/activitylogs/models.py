from django.conf import settings
from django.db import models


class Post(models.Model):
    """Simple post model."""
    title = models.CharField(max_length=128, verbose_name="Post title")
    description = models.TextField(verbose_name="Post description")
    image_src = models.ImageField(verbose_name="Post image")


class ActivityLog(models.Model):
    """Activity logs of actions over Posts."""

    class InteractionType(models.TextChoices):
        LIKE = "LIKE", "Like"
        VIEW = "VIEW", "View"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="activities",
        on_delete=models.CASCADE,
        verbose_name="User",
    )
    post = models.ForeignKey(
        Post,
        related_name="actions",
        on_delete=models.CASCADE,
        verbose_name="Post"
    )
    interaction_type = models.CharField(
        blank=True,
        choices=InteractionType.choices,
        default=None,
        max_length=5,
        null=True,
        verbose_name="Interaction type"
    )
    timestamp = models.DateTimeField(verbose_name="Timestamp", auto_now_add=True)

    class Meta:
        ordering = ("-timestamp",)
