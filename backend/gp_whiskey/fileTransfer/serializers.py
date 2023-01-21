from .models import *
from rest_framework import serializers

class RelatorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relatorio
        fields = ('obra_id', 'nome', 'report_bin', 'tipo')