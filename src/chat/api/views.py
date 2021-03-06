from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
)
from chat.models import Chat, Contact
from chat.views import get_user_contact
from .serializers import ChatSerializer, ContactModelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_auth.views import UserDetailsView

# from allauth.socialaccount.models import SocialToken

User = get_user_model()


# class ContactListView(ListAPIView):
#     queryset = Contact.objects.all()
#     serializer_class = ContactModelSerializer
#     permission_classes = (permissions.IsAuthenticated,)


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(
                {
                    "userID": request.user.id,
                    "user_staff": request.user.is_staff,
                    "user_name": request.user.username,
                    "email": request.user.email,
                },
                status=HTTP_200_OK,
            )
        return Response({}, status=HTTP_200_OK)


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get("username", None)
        if username is not None:
            contact = get_user_contact(username)
            queryset = contact.chats.all()
        return queryset


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny,)


class ContactModelView(RetrieveAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactModelSerializer
    permission_classes = (permissions.AllowAny,)


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated,)
