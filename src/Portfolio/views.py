import datetime

import pytz
import requests
from django.conf import settings
# from users.models import CustomUser
from django.contrib import messages
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.core.mail import send_mail
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models import Q
from django.http import Http404, HttpResponseRedirect
# from .translate import translate
# from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import (get_object_or_404, redirect, render,
                              )
from django.template import RequestContext
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.views.generic import ListView, RedirectView

# from django.contrib.auth import authenticate, login

from .forms import EmailPostForm

from emails.models import Email
from .templates.email.confirmation import template
# Create your views here.

def terms(request):
    return render(request, "tou.html") 

def privacy(request):
    return render(request, "privacy.html") 


def index(request):
    """
    Posts method: list all objects on the database + hide draft versions to non-staff users

    """
    today = timezone.now().date()
    form = EmailPostForm(request.POST or None)
    if form.is_valid() and request.method == 'POST':
        # Form fields passed validation
        ''' Begin reCAPTCHA validation '''
        recaptcha_response = request.POST.get('g-recaptcha-response')
        data = {
            'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
            'response': recaptcha_response
        }
        r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
        result = r.json()
        ''' End reCAPTCHA validation '''

        if result['success']:
            cd = form.cleaned_data
            from sendgrid import SendGridAPIClient
            from sendgrid.helpers.mail import Mail, HtmlContent
            message = Mail(
                from_email=cd['email'],
                to_emails=settings.EMAIL_HOST_RECIPIENT,
                subject=cd['subject'],
                html_content=HtmlContent(template.format(
                    str(cd['firstname'])+" "+str(cd['lastname']), str(cd['message']), str(cd['subject']), str(cd['urgency']), str(cd['pricerange']))))
            try:
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                response = sg.send(message)
                if cd['sendcc'] is True:
                    from sendgrid import SendGridAPIClient
                    from sendgrid.helpers.mail import Mail, HtmlContent
                    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                    message2 = Mail(
                        from_email='noreply@craft.studios',
                        to_emails=cd['email'],
                        subject=cd['subject'],
                html_content=HtmlContent(template.format(
                    str(cd['firstname'])+" "+str(cd['lastname']), str(cd['message']), str(cd['subject']), str(cd['urgency']), str(cd['pricerange'])))
                    )

                    response = sg.send(message2)                    
            except Exception as e:
                messages.error(request, f"Your message could not be sent. {e}")
                return HttpResponseRedirect('/')
                
            messages.success(request, "Your message was successfully sent to: "+settings.EMAIL_HOST_RECIPIENT)
            return HttpResponseRedirect('/')
    else:
        form = EmailPostForm()
    return render(request, "index.html",{"today": today,"form":form}) 


