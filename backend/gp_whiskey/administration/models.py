from django.db import models
from django.utils import timezone

# Create your models here.
# All models related to admin (can be empty, e.g Funcionario, Cliente)


class Cliente(models.Model):
    nome = models.CharField(max_length=512, blank=False)
    mail = models.CharField(max_length=512, blank=False)
    publico = models.BooleanField(default=False, null=False)
    localizacao = models.CharField(max_length=512, blank=False)
    created_at = models.DateTimeField(blank=False)
    updated_at =  models.DateTimeField(blank=False)
    
    def __str__(self):
        return self.nome


class RecursosHumanos(models.Model):
    especializacao = models.CharField(max_length=512, blank=False)
    fornecedor_id = models.ForeignKey('constructions.Fornecedor', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.fornecedor.nome


class Funcionario(models.Model):
    obras = models.ManyToManyField('constructions.Obra')
    nome = models.CharField(max_length=512)
    email = models.CharField(max_length=512)
    cargo = models.CharField(max_length=512)
    seguro_saude = models.CharField(max_length=512)
    data_inicio = models.DateTimeField()
    data_conclusao = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome

