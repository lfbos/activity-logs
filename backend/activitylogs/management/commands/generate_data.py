import random
import time

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db.transaction import atomic
from faker import Faker

from activitylogs.models import Post, ActivityLog

faker = Faker()
Faker.seed(int(time.time()))


class Command(BaseCommand):
    help = 'Generate data for the application'

    def generate_username(self, email):
        return f"{email.split('@')[0]}_{random.randint(10, 999)}"

    @atomic
    def handle(self, *args, **options):
        # Generates 1000 users
        users = []
        for _ in range(1000):
            first_name = faker.first_name()
            last_name = faker.last_name()
            email = faker.email()
            username = self.generate_username(email)
            users.append(User(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                password=make_password(faker.password()),
                is_active=True))

        user_instances = User.objects.bulk_create(users, batch_size=100)

        self.stdout.write(self.style.SUCCESS(f"Total {len(user_instances)} users generated"))

        # Generate 200 posts
        posts = []
        for _ in range(200):
            # TODO: add random images
            posts.append(Post(
                title=faker.sentence(),
                description=faker.paragraph(nb_sentences=5))
        post_instances = Post.objects.bulk_create(posts, batch_size=100)
        self.stdout.write(self.style.SUCCESS(f"Total {len(post_instances)} posts generated"))

        # Generate 1000000
        activity_logs = []
        for _ in range(1000000):
            user = random.choice(users)
            post = random.choice(posts)
            interaction_type = random.choice([
                ActivityLog.InteractionType.LIKE,
                ActivityLog.InteractionType.VIEW])
            activity_logs.append(ActivityLog(
                user_id=user.pk,
                post_id=post.pk,
                interaction_type=interaction_type,
                timestamp=faker.date_time_this_century()))

        activity_log_instances = ActivityLog.objects.bulk_create(activity_logs, batch_size=100)
        self.stdout.write(
            self.style.SUCCESS(f"Total {len(activity_log_instances)} logs generated"))
