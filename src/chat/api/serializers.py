from rest_framework import serializers

from chat.models import Chat, Contact
from chat.views import get_user_contact


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ContactModelSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    fullname = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = ("id", "image_url", "username", "fullname")
        read_only = "id"

    def get_username(self, obj):
        return obj.user.username

    def get_fullname(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def get_image_url(self, obj):
        if obj.image_file:
            return obj.image_file.url
        else:
            return ""


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactModelSerializer(many=True)

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
