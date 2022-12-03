from django.db import models

# Create your models here.
class Obra(models.Model):
    id = models.BigIntegerField(primary_key=True)
    data_inicio = models.DateField()
    data_conclusao = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return str(self.id)

class RegEquipamento(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome_equip = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    obra = models.ForeignKey(Obra, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    
    def __str__(self):
        return str(self.id)
    
class MedicaoEquip(models.Model):
    id = models.BigIntegerField(primary_key=True)
    medicao = models.FloatField()
    unidade_medida = models.CharField(max_length=255)
    regEquipamento = models.ForeignKey(RegEquipamento, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    
    def __str__(self):
        return str(self.id)
    
class Hotel(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome = models.CharField(max_length=255)
    mail = models.EmailField(max_length=255)
    telefone = models.BigIntegerField()
    morada = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    obra = models.ForeignKey(Obra, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    
    def __str__(self):
        return str(self.id)

class ReservaHotel(models.Model):
    id = models.BigIntegerField(primary_key=True)
    reserva_inicio = models.DateField()
    reserva_fim = models.DateField()
    obra = models.ForeignKey(Obra, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    hotel = models.ForeignKey(Hotel, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    
    def __str__(self):
        return str(self.id)
    
class Foto(models.Model):
    id = models.BigIntegerField(primary_key=True)
    foto_bin = models.BinaryField()
    tipo = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    obra = models.ForeignKey(Obra, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    
    def __str__(self):
        return str(self.id)

