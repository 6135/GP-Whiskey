from django.db import models
from django.utils import timezone

# Create your models here.
#Basically the main models go here (e.g. obra, medicoes, gastos, etc)


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
        
class Obra(models.Model):
    # One-to-Many Relationship with Cliente
    #client_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    nome = models.CharField(max_length=512)
    data_inicio = models.DateTimeField()
    data_conclusao = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome


# UniqueConstraint: https://docs.djangoproject.com/en/4.1/ref/models/fields/#django.db.models.ManyToManyField.through
class Restaurante(models.Model):
    # Many-to-Many Relationship with Obra
    obras = models.ManyToManyField(Obra)
    nome = models.CharField(max_length=512)
    mail = models.CharField(max_length=512)
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=512)
    localizacao = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




class GastosExtra(models.Model):
    # One-to-Many Relationship with Obra
    obra_id = models.ForeignKey(Obra, on_delete=models.CASCADE)
    descricao = models.TextField()
    data = models.DateField()
    preco = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


