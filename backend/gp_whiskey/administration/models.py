from django.db import models

from backend.gp_whiskey.constructions.models import Obra

# Create your models here.
# All models related to admin (can be empty, e.g Funcionario, Cliente)
#

class Funcionario(models.Model):
    # Many-to-Many Relationship with Obra
    obras = models.ManyToManyField(Obra)
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

