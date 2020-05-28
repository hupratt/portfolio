"""
WSGI config for Portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os, sys, dotenv

from django.core.wsgi import get_wsgi_application

if os.environ.get("DJANGO_DEVELOPMENT") == "true":
    dotenv.read_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)),'.env.development'))
else:
    dotenv.read_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)),'.env'))

sys.path.append("/home/ubuntu/Dev/PythonBots")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Portfolio.settings')

application = get_wsgi_application()
