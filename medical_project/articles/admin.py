from django.contrib import admin
from articles.models.article import Article
from articles.models.comment import Comment


admin.site.register([Article, Comment])