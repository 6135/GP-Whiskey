"""
Django settings for gp_whiskey project.

Generated by 'django-admin startproject' using Django 4.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import os
from pathlib import Path
import environ

env = environ.Env()
# reading .env file
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost','127.0.0.1','*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'gp_whiskey.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'gp_whiskey.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
ENGINE = 'django.db.backends.postgresql'
if DEBUG:
    if os.environ.get('docker') == 'true':
        DATABASES = {
            'default': {
                'ENGINE': ENGINE,
                'NAME': os.environ.get('POSTGRES_NAME'),
                'USER': os.environ.get('POSTGRES_USER'),
                'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
                'HOST': 'db',
                'PORT': 5432,
            }
        }
    elif env('USE_REMOTE_DB') == 'false':
        DATABASES = {
            'default': {
                'ENGINE': ENGINE,
                'NAME': env("LOCAL_DATABASE_NAME"),
                'USER': env("LOCAL_DATABASE_USER"),
                'PASSWORD': env("LOCAL_DATABASE_PASSWORD"),
                'HOST': env("LOCAL_DATABASE_HOST"),
                'PORT': env("DATABASE_PORT"),
            }
        }
    else:
        DATABASES = {
            'default': {
                'ENGINE': ENGINE,
                'NAME': env("REMOTE_DATABASE_NAME"),
                'USER': env("REMOTE_DATABASE_USER"),
                'PASSWORD': env("REMOTE_DATABASE_PASSWORD"),
                'HOST': env("REMOTE_DATABASE_HOST"),
                'PORT': env("DATABASE_PORT"),
            }
        }
else:
    DATABASES = {
            'default': {
                'ENGINE': ENGINE,
                'NAME': env("REMOTE_DATABASE_PROD_NAME"),
                'USER': env("REMOTE_DATABASE_USER"),
                'PASSWORD': env("REMOTE_DATABASE_PASSWORD"),
                'HOST': env("REMOTE_DATABASE_HOST"),
                'PORT': env("DATABASE_PORT"),
            }
        }
    

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'pt'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'