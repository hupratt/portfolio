from rest_framework import serializers

from chat.models import Chat, Contact
from chat.views import get_user_contact


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ContactModelSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = ("id", "image_url")
        read_only = "id"

    def get_image_url(self, obj):
        return obj.image_file.url


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = ("id", "messages", "participants")
        read_only = "id"

    def create(self, validated_data):
        participants = validated_data.pop("participants")
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat
