
from chat.models import Chat, Contact
from chat.api.serializers import ChatSerializer, ContactModelSerializer
chat = Chat.objects.get(id=1)
s = ChatSerializer(instance=chat)
s.data

hugo7 = Contact.objects.get(id=2)
s = ContactModelSerializer(instance=hugo7)
s.data