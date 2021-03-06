from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Article(models.Model):
    id= models.AutoField(primary_key=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='category_articles', null=True)
    title = models.CharField(max_length=120)
    content = models.TextField()
    video_url =  models.CharField(max_length=200,null=True)
    image = models.ImageField(
        upload_to='article_images', null=True, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_articles', null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
