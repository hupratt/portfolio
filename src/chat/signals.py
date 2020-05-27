from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.core.files import File
from chat.models import Contact
import urllib, logging

logger = logging.getLogger("django")

@receiver(user_signed_up)
def user_signed_up_(request, user, sociallogin=None, **kwargs):
    '''
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:
 
    sociallogin.account.provider  # e.g. 'twitter' 
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']
 
    See the socialaccount_socialaccount table for more in the 'extra_data' field.
    '''
    if sociallogin:
        logger.info(f'creating a contact instance from the {sociallogin.account.provider} social account')
        name = sociallogin.account.extra_data['name']
        logger.info(f'name: {name}')
        logger.info(f'sociallogin.account: {sociallogin.account}')
        picture_path = sociallogin.account.get_avatar_url()
        contact_instance, _ = Contact.objects.get_or_create(user=user, image_url=picture_path)
        admin, _ = Contact.objects.get_or_create(user=1)
        if isinstance(admin, Contact):
            contact_instance.friends.add(admin)
            contact_instance.save()
        else:
            raise ValueError("Admin's contact could not be found")