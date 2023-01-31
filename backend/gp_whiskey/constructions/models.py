from django.db import models
from django.utils import timezone

from administration.models import Funcionario
# const variable for constructions.Obra
OBRA_MODEL = 'constructions.Obra'

# Create your models here.
# Basically the main models go here (e.g. obra, medicoes, gastos, etc)


class Carro(models.Model):
    matricula = models.CharField(max_length=512, blank=False, unique=True)
    marca = models.CharField(max_length=512, blank=False)
    ano = models.IntegerField(null=True, blank=True)
    obra = models.ManyToManyField(OBRA_MODEL)
    seguradora = models.CharField(max_length=512, blank=False)
    data_inicio = models.DateField(blank=False)
    data_fim = models.DateField(blank=False)
    arquivado = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.matricula


class Fornecedor(models.Model):
    nome = models.CharField(max_length=512, blank=False)
    telefone = models.BigIntegerField(blank=False)
    email = models.CharField(max_length=512, blank=False)
    morada = models.CharField(max_length=512, blank=False)
    obra = models.ManyToManyField(OBRA_MODEL)
    localizacao = models.CharField(max_length=512, blank=False)
    arquivado = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome

# Forecedor de Equipamentos? Devia ser mais explícito.


class Equipamento(Fornecedor):

    def str(self):
        return self.nome

# Forecedor de Equipamentos? Devia ser mais explícito.


class RecursosHumanos(Fornecedor):
    especializacao = models.CharField(max_length=512, blank=False)

    def str(self):
        return self.nome

# UniqueConstraint: https://docs.djangoproject.com/en/4.1/ref/models/fields/#django.db.models.ManyToManyField.through


class Restaurante(models.Model):
    nome = models.CharField(max_length=512)
    email = models.CharField(max_length=512)
    obra = models.ManyToManyField(OBRA_MODEL)
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=512)
    arquivado = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Obra(models.Model):
    cliente = models.ForeignKey(
        'administration.Cliente', on_delete=models.DO_NOTHING)
    # carros = models.ManyToManyField(Carro)
    # fornecedores = models.ManyToManyField(Fornecedor)
    # restaurantes = models.ManyToManyField(Restaurante)
    # funcionarios = models.ManyToManyField(Funcionario)
    # hoteis = models.ManyToManyField('constructions.Hotel',through='constructions.Reserva')
    nome = models.CharField(max_length=512)
    data_inicio = models.DateTimeField(default=timezone.now)
    data_conclusao = models.DateTimeField(default=timezone.now)
    encerrada = models.BooleanField(default=False, null=False)
    nr_obra = models.CharField(max_length=512, null=True)
    transportadora = models.CharField(max_length=512, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def hoteis(self):
        return Hotel.objects.filter(reservas__obra=self).distinct()

    def __str__(self):
        return self.nome


class GastosExtra(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    descricao = models.TextField()
    data = models.DateField()
    preco = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class RegEquipamento(models.Model):
    nome_equip = models.CharField(max_length=255)
    arquivado = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    #
    def __str__(self):
        return str(self.id)


class MedicaoEquip(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    reg_equipamento = models.ForeignKey(
        RegEquipamento, on_delete=models.CASCADE, null=False)
    funcionario = models.ForeignKey(
        'administration.Funcionario', on_delete=models.CASCADE)
    medicao = models.FloatField()
    unidade_medida = models.CharField(max_length=255)

    def __str__(self):
        return str(self.id)


class Hotel(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=255)

    arquivado = models.BooleanField(default=False, null=False)
    obras = models.ManyToManyField(Obra,through='Reserva')

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    obra=models.ManyToManyField(Obra,through='Reserva')

    #Hotel e obra nao e uma many to many na realidade, devido ao facto de puder haver varias reservas de um hotel para uma obra, e nao apenas uma.
    #isto causa problemas porque numa verdadeira many to many apenas poderia haver um par (hotel,obra) na tabela de ligacao, mas como queremos ter varias reservas para um hotel e obra,
    #A tabela de ligacao tem de ter mais que um par (hotel,obra) para que possamos ter varias reservas para um hotel e obra.
    #One hotel can have many Reservas for one obra
    #One obra can have many Reservas for one hotel
    #One reserva can have one hotel and one obra
    @property
    def obras(self):
        return Obra.objects.filter(reservas__hotel=self).distinct()

    def __str__(self) :
        return str(self.id)


class Reserva(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE, related_name='reservas')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reservas')
    reserva_inicio = models.DateField()
    reserva_fim = models.DateField()

    def __str__(self):
        return str(self.reserva_inicio) + " - " + str(self.reserva_fim)


class Foto(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    funcionario = models.ForeignKey(
        'administration.Funcionario', on_delete=models.CASCADE)
    foto_bin = models.BinaryField()
    tipo = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return str(self.id)
