from django.conf.urls import url
from . import views
from django.urls import path

# from django.conf import settings
# from django.conf.urls.static import static

urlpatterns = [
    path('contact/', views.contact, name='contact'),

]
