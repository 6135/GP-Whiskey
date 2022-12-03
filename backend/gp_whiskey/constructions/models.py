from django.db import models

# Create your models here.
#Basically the main models go here (e.g. obra, medicoes, gastos, etc)

class Obra(models.Model):
    # One-to-Many Relationship with Cliente
    # TODO Uncomment next line when class Cliente is available
    #client_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    nome = models.CharField(max_length=512)
    data_inicio = models.DateTimeField()
    data_conclusao = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


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
