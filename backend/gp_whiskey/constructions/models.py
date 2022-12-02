from django.db import models

# Create your models here.
#Basically the main models go here (e.g. obra, medicoes, gastos, etc)

class Obra(models.Model):
    #client_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    nome = models.CharField()
    data_inicio = models.DateTimeField()
    data_conclusao = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)