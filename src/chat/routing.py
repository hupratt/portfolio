# chat/routing.py
from django.urls import re_path
from django.views.generic import TemplateView

from .consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer),
]
