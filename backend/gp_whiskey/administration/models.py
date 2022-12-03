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
    
    def str(self):
        return self.nome


class RecursosHumanos(models.Model):
    especializacao = models.CharField(max_length=512, blank=False)
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    
    def str(self):
        return self.fornecedor.nome


