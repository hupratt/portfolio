"""
Django settings for Portfolio project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""
from django.utils.translation import ugettext_lazy as _
import os


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
if os.environ.get("DJANGO_DEVELOPMENT") is not None:
    DEBUG = True

ALLOWED_HOSTS = ["www.craftstudios.eu"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "corsheaders",
    "django_extensions",
    # chat api
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.github",
    "allauth.socialaccount.providers.facebook",
    "rest_auth",
    "rest_auth.registration",
    "rest_framework",
    "rest_framework.authtoken",
    "channels",
    # end chat api
    "posts",
    "emails",
    "chat.apps.ChatConfig",
    "frontend",
]
SITE_ID = 1

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
}

# REST_AUTH_SERIALIZERS = {
#     'USER_DETAILS_SERIALIZER' : 'rest_auth.serializers.UserDetailsSerializer',
# }

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:9000",
]

# CORS_ORIGIN_REGEX_WHITELIST = [
#     r"^https://\rural\.craftstudios\.eu$",
# ]

ROOT_URLCONF = "Portfolio.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "Portfolio", "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "Portfolio.context_processors.ga_tracking_id",
            ],
        },
    },
]


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "craftstudios",
        "USER": os.environ.get("dbuser"),
        "PASSWORD": os.environ.get("dbpassword"),
        "HOST": os.environ.get("hostip"),
        "PORT": os.environ.get("pnumber"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en"

TIME_ZONE = "Europe/Luxembourg"

USE_I18N = True

USE_L10N = True

USE_TZ = True

LANGUAGES = (
    ("en", _("English")),
    ("de", _("German")),
    ("fr", _("French")),
    ("pt", _("Portuguese")),
)

KLINGON_DEFAULT_LANGUAGE = "en"


def ugettext(s):
    return s


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), "static")
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), "media")

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)


GA_TRACKING_ID = os.environ.get("GA_TRACKING_ID")
GOOGLE_RECAPTCHA_SECRET_KEY = os.environ.get("GOOGLE_RECAPTCHA_SITE_KEY_craft")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_RECIPIENT = "cortohprattdo@gmail.com"
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")


# Sentry

if os.environ.get("DJANGO_DEVELOPMENT") is None:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn="https://" + os.getenv("SENTRY_KEY", "") + "@sentry.io/1890369",
        integrations=[DjangoIntegration()],
        send_default_pii=True,
    )
    # SECURITY
    SECURE_HSTS_SECONDS = 31536000
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    X_FRAME_OPTIONS = "DENY"
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_PRELOAD = True


CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(os.environ.get("REDIS_IP"), os.environ.get("REDIS_PORT"))],
        },
    },
}

CSRF_COOKIE_NAME = "csrftoken"
WSGI_APPLICATION = "Portfolio.wsgi.application"
ASGI_APPLICATION = "Portfolio.routing.application"

BASE_URL = os.getenv("BASE_URL", "")
LOGIN_REDIRECT_URL = f"{BASE_URL}/chat/"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(name)s.%(funcName)s:%(lineno)s- %(message)s"
        },
        "simple": {"format": "{levelname} {message}", "style": "{"},
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "ERROR",  # ERROR
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "error.log"),
            "formatter": "verbose",
        },
    },
    "loggers": {
        # create instance of log called 'django'
        "django": {
            # output logs to the console and to the file
            "level": "INFO",
            "handlers": ["file", "console"],
            "propagate": True,
        },
        "daphne": {"handlers": ["file", "console"], "level": "INFO"},
    },
}
