# Generated by Django 4.1.2 on 2022-10-18 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activitylogs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image_src',
            field=models.ImageField(upload_to='posts', verbose_name='Post image'),
        ),
    ]
