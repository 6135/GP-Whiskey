from django.db import models

from administration.models import Funcionario

# Create your models here.
# Basically the main models go here (e.g. obra, medicoes, gastos, etc)

class Carro(models.Model):
    matricula = models.CharField(max_length=512, blank=False, unique=True)
    marca = models.CharField(max_length=512, blank=False)
    ano = models.IntegerField(null=True, blank=True)
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
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=512)
    arquivado = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Obra(models.Model):
    cliente = models.ForeignKey('administration.Cliente', on_delete=models.DO_NOTHING)
    carros = models.ManyToManyField(Carro)
    fornecedores = models.ManyToManyField(Fornecedor)
    restaurantes = models.ManyToManyField(Restaurante)
    funcionarios = models.ManyToManyField(Funcionario)
    nome = models.CharField(max_length=512)
    data_inicio = models.DateTimeField()
    data_conclusao = models.DateTimeField()
    encerrada = models.BooleanField(default=False, null=False)
    nr_obra = models.CharField(max_length=512)
    transportadora = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    #
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
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return str(self.id)


class ReservaHotel(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    reserva_inicio = models.DateField()
    reserva_fim = models.DateField()

    def __str__(self):
        return str(self.id)


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
