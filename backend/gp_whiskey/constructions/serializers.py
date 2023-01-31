from administration.serializers import FuncionarioSerializer
from .models import *
from rest_framework import serializers

class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = ('id','cliente', 'nome', 'data_inicio', 'data_conclusao', 'encerrada')

class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = ('id', 'tipo')

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('nome', 'email', 'telefone', 'morada' )

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ('id', 'reserva_inicio', 'reserva_fim')

class RegEquipamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegEquipamento
        fields = ('nome_equip')

class MedicacaoEquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicaoEquip
        fields = ('medicao', 'unidade_medida')

class CarroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carro
        fields = ('matricula', 'marca', 'ano', 'seguradora', 'data_inicio', 'data_fim')

class GastosExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastosExtra
        fields = ('descricao', 'data', 'preco')

class RestauranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurante
        fields = ('nome', 'email', 'telefone', 'morada')
        
class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor        
        fields = ('nome', 'telefone', 'email', 'morada', 'localizacao')

class RecursosHumanosSerializer(FornecedorSerializer):
    class Meta:
        model = RecursosHumanos
        fields = FornecedorSerializer.Meta.fields + ('especializacao',)

class EquipamentoSerializer(FornecedorSerializer):
    class Meta:
        model = Equipamento
        fields = FornecedorSerializer.Meta.fields
