import sys
import uuid
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

def has_changed(instance, field):
    if not instance.pk:
        return False
    old_value = instance.__class__._default_manager.filter(pk=instance.pk).values(field).get()[field]
    return not getattr(instance, field) == old_value


def create_thumbnail(image, size) -> InMemoryUploadedFile:
    data_img = BytesIO()
    img = Image.open(image)
    img = img.convert('RGB')
    THUMBNAIL_SIZE = (size, size)
    img.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)
    img.save(data_img, format='jpeg', quality=100, progressive=True)

    return InMemoryUploadedFile(data_img, 'ImageField', '%s.%s' % (uuid.uuid4(), 'jpeg'), 'jpeg', sys.getsizeof(data_img), None)
    