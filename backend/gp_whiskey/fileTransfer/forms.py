from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError

from .models import *

class RelatorioForm(forms.ModelForm):
    obra_id = forms.BigIntegerField(label="Obra_id", widget=forms.TextInput())
    nome = forms.CharField(label="Nome", widget=forms.TextInput())
    report_bin = forms.CharField(label="Data", widget=forms.TextInput())
    tipo = forms.CharField(label="Tipo", widget=forms.TextInput())