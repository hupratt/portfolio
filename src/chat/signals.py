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
        # Extract first / last names from social nets and store on User record
        if sociallogin.account.provider == 'github':
            contact_instance = ''
            name = sociallogin.account.extra_data['name']
            if ' ' in name:
                first_name, last_name = name.split(' ')
                contact_instance = Contact.objects.create(first_name=name, last_name=last_name)
            else:
                contact_instance = Contact.objects.create(first_name=name)
            picture_path = sociallogin.account.get_avatar_url()
            if picture_path is not None or picture_path is not 'None':
                logger.info(f'creating image with path: {picture_path}')
                result = urllib.request.urlretrieve(picture_path)
                contact_instance.image = File(open(result[0], 'rb'))
                contact_instance.save()
        elif sociallogin.account.provider == 'facebook':
            name = sociallogin.account.extra_data['name']
            logger.info(f'name: {name}')
            logger.info(f'sociallogin.account: {sociallogin.account}')
            if ' ' in name:
                first_name, last_name = name.split(' ')
                contact_instance = Contact.objects.create(first_name=name, last_name=last_name)
            else:
                contact_instance = Contact.objects.create(first_name=name)
            picture_path = sociallogin.account.get_avatar_url()
            if picture_path is not None or picture_path is not 'None':
                logger.info(f'creating image with path: {picture_path}')
                result = urllib.request.urlretrieve(picture_path)
                contact_instance.image = File(open(result[0], 'rb'))
                contact_instance.save()
        elif sociallogin.account.provider == 'google':
            name = sociallogin.account.extra_data['name']
            logger.info(f'name: {name}')
            logger.info(f'sociallogin.account: {sociallogin.account}')
            if ' ' in name:
                first_name, last_name = name.split(' ')
                contact_instance = Contact.objects.create(first_name=name, last_name=last_name)
            else:
                contact_instance = Contact.objects.create(first_name=name)
            picture_path = sociallogin.account.get_avatar_url()
            if picture_path is not None or picture_path is not 'None':
                logger.info(f'creating image with path: {picture_path}')
                result = urllib.request.urlretrieve(picture_path)
                contact_instance.image = File(open(result[0], 'rb'))
                contact_instance.save()