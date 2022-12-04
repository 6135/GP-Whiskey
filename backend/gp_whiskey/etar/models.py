from django.db import models

# Create your models here.

class MedicaoEquip(models.Model):
    id = models.BigIntegerField(primary_key=True)
    medicao = models.FloatField()
    unidade_medida = models.CharField(max_length=255)
    
    def __str__(self):
        return str(self.id)


class RegEquipamento(MedicaoEquip):
    nome_equip = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return str(self.id)

class Foto(models.Model):
    id = models.BigIntegerField(primary_key=True)
    foto_bin = models.BinaryField()
    tipo = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return str(self.id)

class Obra(models.Model):
    id = models.BigIntegerField(primary_key=True)
    data_inicio = models.DateField()
    data_conclusao = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    regEquipamento = models.ForeignKey(RegEquipamento(models.Model), on_delete=models.CASCADE, null=True, blank=True)
    foto = models.ForeignKey(Foto, on_delete=models.CASCADE, null=True, blank=True)

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
    obra = models.OneToOneField(Obra, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.id)


class ReservaHotel(Hotel):
    reserva_inicio = models.DateField()
    reserva_fim = models.DateField()
    
    def __str__(self):
        return str(self.id)