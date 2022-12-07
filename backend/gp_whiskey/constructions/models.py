from django.db import models
from django.utils import timezone

# Create your models here.
# Basically the main models go here (e.g. obra, medicoes, gastos, etc)


class Obra(models.Model):
    cliente_id = models.ForeignKey('administration.Cliente', on_delete=models.CASCADE)
    nome = models.CharField(max_length=512)
    data_inicio = models.DateTimeField()
    data_conclusao = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome

class Carro(models.Model):
    obras = models.ManyToManyField(Obra)
    matricula = models.CharField(max_length=512, blank=False)
    marca = models.CharField(max_length=512, blank=False)
    ano = models.IntegerField(null=True, blank=True)
    seguradora = models.CharField(max_length=512, blank=False)
    data_inicio = models.DateField(blank=False)
    data_fim = models.DateField(blank=False)
    created_at = models.DateTimeField(blank=False)
    updated_at = models.DateTimeField(blank=False)
    
    def __str__(self):
        return self.matricula


class Fornecedor(models.Model):
    obras = models.ManyToManyField(Obra)
    nome = models.CharField(max_length=512, blank=False)
    telefone = models.BigIntegerField(blank=False)
    mail = models.CharField(max_length=512,blank=False)
    morada = models.CharField(max_length=512,blank=False)
    localizacao = models.CharField(max_length=512,blank=False)
    created_at = models.DateTimeField(blank=False)
    updated_at =  models.DateTimeField(blank=False)
    
    def __str__(self):
        return self.nome


class Equipamento(models.Model):
    fornecedor_id = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.fornecedor.nome


# UniqueConstraint: https://docs.djangoproject.com/en/4.1/ref/models/fields/#django.db.models.ManyToManyField.through
class Restaurante(models.Model):
    obras = models.ManyToManyField(Obra)
    nome = models.CharField(max_length=512)
    mail = models.CharField(max_length=512)
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=512)
    localizacao = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class GastosExtra(models.Model):
    obra_id = models.ForeignKey(Obra, on_delete=models.CASCADE)
    descricao = models.TextField()
    data = models.DateField()
    preco = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class MedicaoEquip(models.Model):
    id = models.BigIntegerField(primary_key=True)
    medicao = models.FloatField()
    unidade_medida = models.CharField(max_length=255)
    
    def __str__(self):
        return str(self.id)


class RegEquipamento(MedicaoEquip):
    nome_equip = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return str(self.id)

class Hotel(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome = models.CharField(max_length=255)
    mail = models.EmailField(max_length=255)
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    obra = models.OneToOneField(Obra, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.id)


class ReservaHotel(Hotel):
    reserva_inicio = models.DateField()
    reserva_fim = models.DateField()
    
    def __str__(self):
        return str(self.id)

class Foto(models.Model):
    id = models.BigIntegerField(primary_key=True)
    foto_bin = models.BinaryField()
    tipo = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return str(self.id)