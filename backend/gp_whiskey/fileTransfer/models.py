from django.db import models

# Create your models here.
# Entities related to files (e.g. foto)


class Relatorio(models.Model):
    obra = models.ForeignKey(
        'constructions.Obra', on_delete=models.CASCADE)
    funcionario = models.ForeignKey(
        'administration.Funcionario', on_delete=models.CASCADE)
    tipo = models.CharField(max_length=512)
    report_bin = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
