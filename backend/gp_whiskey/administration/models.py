from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

import uuid

from .managers import CustomUserManager

# Create your models here.
# All models related to admin (can be empty, e.g Funcionario, Cliente)

class UserEmployer(AbstractBaseUser, PermissionsMixin):

    # These fields tie to the roles!
    ADMIN = 1
    Engineer = 2
    EMPLOYEE = 3

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (Engineer, 'Engineer'),
        (EMPLOYEE, 'Employee')
    )
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    # Roles created here
    uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=3)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    created_by = models.EmailField()
    modified_by = models.EmailField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def get_full_name(self):
        return self.first_name + " " + self.last_name


    def __str__(self):
        return self.email

class Cliente(models.Model):
    nome = models.CharField(max_length=512, blank=False)
    mail = models.CharField(max_length=512, blank=False)
    publico = models.BooleanField(default=False, null=False)
    morada = models.CharField(max_length=512, blank=False)
    arquivado = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome


class RecursosHumanos(models.Model):
    fornecedor = models.ForeignKey(
        'constructions.Fornecedor', on_delete=models.CASCADE)
    especializacao = models.CharField(max_length=512, blank=False)

    def __str__(self):
        return self.fornecedor.nome


class Funcionario(models.Model):
    obras = models.ManyToManyField('constructions.Obra')
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
