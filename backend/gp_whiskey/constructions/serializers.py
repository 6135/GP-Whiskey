from .models import *
from rest_framework import serializers

class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = ('cliente_id', 'nome', 'data_inicio', 'data_conclusao', 'encerrada')

class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = ('id', 'tipo')

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('nome', 'mail', 'telefone', 'morada' )

class ReservaHotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaHotel
        fields = ('id', 'reserva_inicio', 'reserva_fim')

class RegEquipamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegEquipamento
        fields = ('nome_equip')

class MedicacaoEquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicaoEquip
        fields = ('medicao', 'unidade_medida')
    
