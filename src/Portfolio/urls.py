from django.contrib import admin
from django.urls import path # pylint: disable=no-name-in-module
from django.conf.urls import url, include
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.utils.translation import ugettext_lazy as _
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('chat/', include('chat.urls', namespace='chat')),
]

urlpatterns += i18n_patterns(
    url('', views.index, name='index'), 
    prefix_default_language=True)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

