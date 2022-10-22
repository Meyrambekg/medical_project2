from django.db import models
from django.utils.translation import gettext_lazy as _
from common.custom_model import AbstractModel
from ckeditor_uploader.fields import RichTextUploadingField
from common.utils.image_progressive import create_thumbnail, has_changed
from user.models import User


class Article(AbstractModel):
    title = models.CharField(_('Название'), max_length=500, blank=True)
    body = RichTextUploadingField()
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, related_name='articles', blank=True)
    image = models.FileField(_('Обложка'), upload_to='articles', blank=True)
    moderated = models.BooleanField(default=False, blank=True)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    def increase_views(self):
        self.views += 1
        self.save()

    def save(self) -> None:
        if (has_changed(self, 'image')):
            self.image = create_thumbnail(self.image, 720)
        return super().save()

    class Meta:
        ordering = ['-created_at', '-views']
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'