from .models import *
from rest_framework import serializers

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('nome', 'mail', 'publico', 'morada', 'arquivado')

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ('nome', 'email', 'cargo', 'seguro_saude', 'data_inicio', 'data_conclusao')