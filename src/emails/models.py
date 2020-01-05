
from django.db import models
from django.conf import settings
from django.urls import reverse
import os
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from datetime import datetime
from django.forms import ValidationError


class Email(models.Model):

    firstname = models.CharField(max_length=120)
    lastname = models.CharField(max_length=120)
    email = models.EmailField(max_length=120) 
    message = models.TextField(null=True, blank=True)
    sendcc = models.BooleanField(default=False)
    urgency = models.CharField(max_length=120)
    subject = models.CharField(max_length=120)
    pricerange = models.CharField(max_length=120)
    price = models.IntegerField()

    updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.email + self.timestamp

    def __unicode__(self):
        return self.email + self.timestamp

