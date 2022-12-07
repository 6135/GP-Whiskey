from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError

from .models import *

class ClientForm(forms.ModelForm):
    nome = forms.CharField(label="Nome", widget=forms.TextInput())
    mail = forms.CharField(label="Mail", widget=forms.TextInput())
    publico = forms.BooleanField(label="Nome", widget=forms.TextInput())
    morada = forms.CharField(label="Morada", widget=forms.TextInput())
    arquivado = forms.BooleanField(label="Arquivado", widget=forms.TextInput())