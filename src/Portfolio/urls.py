from django.contrib import admin
from django.urls import path  # pylint: disable=no-name-in-module
from django.conf.urls import url, include
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.utils.translation import ugettext_lazy as _
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("privacy/", views.privacy, name="privacy"),
    path("terms/", views.terms, name="terms"),
    path("chat/", include("chat.urls", namespace="chat")),
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("api-auth/", include("rest_framework.urls")),
]

urlpatterns += i18n_patterns(prefix_default_language=True)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
