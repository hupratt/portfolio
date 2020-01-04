"""Portfolio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path # pylint: disable=no-name-in-module
from django.conf.urls import url, include
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.utils.translation import ugettext_lazy as _

urlpatterns = [
    path('admin/', admin.site.urls),
    
]

urlpatterns += i18n_patterns(
    url('', TemplateView.as_view(template_name="index.html"), name='index'), 
    url(_('posts/'), include('posts.urls')),
    url(_(''), include('user.urls')),

    prefix_default_language=True)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
