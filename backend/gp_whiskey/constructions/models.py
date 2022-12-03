from django.db import models

# Create your models here.
#Basically the main models go here (e.g. obra, medicoes, gastos, etc)

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


class Relatorio(models.Model):
    # One-to-Many Relationship with Obra
    obra_id = models.ForeignKey(Obra, on_delete=models.CASCADE)


class GastosExtra(models.Model):
    # One-to-Many Relationship with Obra
    obra_id = models.ForeignKey(Obra, on_delete=models.CASCADE)

