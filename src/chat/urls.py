from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

app_name = "chat"

urlpatterns = [
    path("chat/", include("chat.api.urls", namespace="chat")),
    path("rest-auth/", include("rest_auth.urls")),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    re_path(r"^.*", TemplateView.as_view(template_name="frontend/index.html")),
]
