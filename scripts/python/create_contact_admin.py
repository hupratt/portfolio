from chat.models import Contact, Chat, Message
from django.contrib.auth import get_user_model
User = get_user_model()

admin, _ = Contact.objects.get_or_create(user=User.objects.get(pk=1))
admin.image_url = 'https://avatars2.githubusercontent.com/u/38809698?s=460&u=a10478aa9a5a6709c32eec29f016150d8f5bd242&v=4'
admin.save()

guest, _ = Contact.objects.get_or_create(user=User.objects.get(pk=2))

new = User.objects.create(username='new')
new.save()
newcontact, _ = Contact.objects.get_or_create(user=User.objects.get(pk=3))


conversation, _ = Chat.objects.get_or_create(participants=guest)

conversation.participants.add(newcontact)
conversation.save()
conversation.participants.all()

message = Message.objects.create(contact= admin,content=f"Hello {guest.user.first_name}, send me a message and i'll get back to you ASAP")
conversation.messages.add(message)
conversation.save()

