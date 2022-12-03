from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError

from .models import *

class ObraForm(forms.ModelForm):
    id = forms.BigIntegerField(label="Id", widget=forms.TextInput())
    data_inicio = forms.DateField(label="Data de inicio", widget=forms.DateTimeInput)
    data_conclusao = forms.DateField(label="Data de conclusao", widget=forms.DateTimeInput)

class FotoForm(forms.ModelForm):
    id = forms.BigIntegerField(label="Id", widget=forms.TextInput())
    tipo = forms.CharField(label="Tipo", widget=forms.TextInput())
    foto_bin = forms.BinaryField(label="Fotografia", widget=forms.FileInput)

    
class HotelForm(forms.ModelForm):
    nome = forms.CharField(label="Nome", widget=forms.TextInput)
    mail = forms.CharField(label="Email", widget=forms.EmailInput)
    telefone = forms.BigIntegerField(label="Telefone", widget=forms.NumberInput)
    morada = forms.CharField(label="Morada", widget=forms.TextInput)

class ReservaHotelForm(forms.ModelForm):
    id = forms.BigIntegerField(label="Id", widget=forms.TextInput())
    reserva_inicio = forms.DateField(label="Inicio da reserva", widget=forms.DateTimeInput)
    reserva_fim = forms.DateField(label="Inicio da reserva", widget=forms.DateTimeInput)

class RegEquipamentoForm(forms.ModelForm):
    nome_equip = forms.CharField(label="Nome: ", widget=forms.TextInput)
#obra = forms.InlineForeignKeyField(Obra, null=True, blank=True)
    
class MedicaoEquipForm(forms.ModelForm):
    medicao = forms.FloatField(label="Valor da medicao", widget=forms.NumberInput)
    unidade_medida = forms.CharField(label="Unidade de medida", widget=forms.TextInput)
    #regEquipamento = forms.InlineForeignKeyField(RegEquipamento, null=True, blank=True)

    