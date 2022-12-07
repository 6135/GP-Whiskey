from django.db import models

# Create your models here.
#Entities related to files (e.g. foto)
from constructions.models import Obra
class Relatorio(models.Model):
    # One-to-Many Relationship with Obra
    obra_id = models.ForeignKey(Obra, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=512)
    report_bin = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    