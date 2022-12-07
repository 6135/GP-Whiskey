from .models import *
from rest_framework import serializers

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('nome', 'mail', 'publico', 'morada', 'arquivado')
