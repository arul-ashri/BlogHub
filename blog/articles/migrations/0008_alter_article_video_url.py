# Generated by Django 3.2.5 on 2021-07-10 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0007_alter_article_video_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='video_url',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
