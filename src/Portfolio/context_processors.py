from django.conf import settings


def ga_tracking_id(request):
    return {'ga_tracking_id': 'UA-156552206-1'}