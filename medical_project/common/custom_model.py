from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

User = settings.AUTH_USER_MODEL


class AbstractModel(models.Model):
    created_at = models.DateTimeField(verbose_name=_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_('Изменен'), auto_now=True)

    class Meta:
        abstract = True