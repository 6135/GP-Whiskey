from administration.serializers import FuncionarioSerializer
from .models import *
from rest_framework import serializers

class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = ('id','cliente', 'nome', 'data_inicio', 'data_conclusao', 'encerrada', 'arquivado')

class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = ('id', 'tipo')

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('nome', 'email', 'telefone', 'morada', 'arquivado' )

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ('id', 'reserva_inicio', 'reserva_fim', 'arquivado')

class RegEquipamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegEquipamento
        fields = ('nome_equip', 'arquivado')

class MedicacaoEquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicaoEquip
        fields = ('medicao', 'unidade_medida')

class CarroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carro
        fields = ('matricula', 'marca', 'ano', 'seguradora', 'data_inicio', 'data_fim', 'arquivado')

class GastosExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastosExtra
        fields = ('descricao', 'data', 'preco', 'arquivado')

class RestauranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurante
        fields = ('nome', 'email', 'telefone', 'morada', 'arquivado')
        
class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor        
        fields = ('nome', 'telefone', 'email', 'morada', 'localizacao', 'arquivado')

class RecursosHumanosSerializer(FornecedorSerializer):
    class Meta:
        model = RecursosHumanos
        fields = FornecedorSerializer.Meta.fields + ('especializacao',)

class EquipamentoSerializer(FornecedorSerializer):
    class Meta:
        model = Equipamento
        fields = FornecedorSerializer.Meta.fields