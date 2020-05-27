from chat.models import Contact
from django.contrib.auth import get_user_model
User = get_user_model()
admin, _ = Contact.objects.get_or_create(user=User.objects.get(pk=1))
admin.image_url = 'https://avatars2.githubusercontent.com/u/38809698?s=460&u=a10478aa9a5a6709c32eec29f016150d8f5bd242&v=4'
admin.save()