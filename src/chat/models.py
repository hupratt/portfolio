from django.contrib.auth import get_user_model
from django.db import models
from django.core.files import File
import os, logging
from urllib import request
from base64 import b64decode
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile

User = get_user_model()
logger = logging.getLogger('django')

class Contact(models.Model):
    user = models.ForeignKey(
        User, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)
    image_file = models.ImageField(upload_to='contact_profile_picture',
        blank=True, null=True, help_text="(optional) profile pic"
    )
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.user.username

    def get_remote_image(self):
        result = request.urlretrieve(self.image_url)
        img_path = result[0]
        contentType = result[1].get('Content-Type')
        if '/' in contentType:
            format = contentType[contentType.find('/')+1:]
            try:
                # image_content = ContentFile(b64decode(img_path))
                image_content = File(open(img_path, 'rb'))
                self.image_file.save(f"image_{self.user.username}.{format}",image_content)

            except IOError as e:
                logger.error(e)


    def save(self, *args, **kwargs):
        if self.image_url and not self.image_file:
            self.get_remote_image()
        else:
            super().save(*args, **kwargs) 

class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.username


class Chat(models.Model):
    participants = models.ManyToManyField(
        Contact, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return "{}".format(self.pk)
