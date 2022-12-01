from django.db import models
from django.utils import timezone

# Create your models here.
# All models related to admin (can be empty, e.g Funcionario, Cliente)

class Fornecedor(models.Model):
    nome = models.CharField(max_length=512, blank=False)
    telefone = models.BigIntegerField(max_length=50,  blank=False)
    mail = models.CharField(max_length=512,blank=False)
    morada = models.CharField(max_length=512,blank=False)
    localizacao = models.CharField(max_length=512,blank=False)
    created_at = models.DateTimeField(blank=False)
    updated_at =  models.DateTimeField(blank=False)
    
    def str(self):
        return self.nome
        
class Cliente(models.Model):
    nome = models.CharField(max_length=512, blank=False)
    mail = models.CharField(max_length=512, blank=False)
    publico = models.BooleanField(default=False, null=False)
    localizacao = models.CharField(max_length=512, blank=False)
    created_at = models.DateTimeField(blank=False)
    updated_at =  models.DateTimeField(blank=False)
    
    def str(self):
        return self.nome

class Carro(models.Model):
    matricula = models.CharField(max_length=512, blank=False)
    marca = models.CharField(max_length=512, blank=False)
    ano = models.IntegerField(null=True, blank=True)
    seguradora = models.CharField(max_length=512, blank=False)
    data_inicio = models.DateField(blank=False)
    data_fim = models.DateField(blank=False)
    created_at = models.DateTimeField(blank=False)
    updated_at = models.DateTimeField(blank=False)
    
    def str(self):
        return self.matricula
        
class Equipamento(models.Model):
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    
    def str(self):
        return self.fornecedor.nome

# o return está correcto?
class FornecedorObra(models.Model):
    fornecedor_id = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    obra_id = models.ForeignKey(Obra, on_delete=models.CASCADE)

    def __str__(self):
        return self.fornecedor_id.nome, self.obra_id
        




