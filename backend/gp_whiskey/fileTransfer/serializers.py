from .models import *
from rest_framework import serializers

class RelatorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relatorio
        fields = ('nome', 'report_bin', 'tipo')