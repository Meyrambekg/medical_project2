from django.db import models
from django.utils.translation import gettext_lazy as _
from articles.models.article import Article
from common.custom_model import AbstractModel
from user.models import User


class Comment(AbstractModel):
    body = models.TextField(blank=False)
    owner = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, null=False)
    reply = models.ForeignKey('self', related_name='replies', on_delete=models.SET_NULL, null=True, blank=True)
    article = models.ForeignKey(Article, related_name='comments', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"{self.article.title} - {self.owner.full_name}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'