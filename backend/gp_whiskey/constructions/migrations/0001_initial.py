# Generated by Django 4.1.5 on 2023-01-31 21:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('administration', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fornecedor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=512)),
                ('telefone', models.BigIntegerField()),
                ('email', models.CharField(max_length=512)),
                ('morada', models.CharField(max_length=512)),
                ('localizacao', models.CharField(max_length=512)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255)),
                ('telefone', models.BigIntegerField()),
                ('morada', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Obra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=512)),
                ('data_inicio', models.DateTimeField(default=django.utils.timezone.now)),
                ('data_conclusao', models.DateTimeField(default=django.utils.timezone.now)),
                ('encerrada', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='administration.cliente')),
            ],
        ),
        migrations.CreateModel(
            name='RegEquipamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_equip', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Equipamento',
            fields=[
                ('fornecedor_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='constructions.fornecedor')),
            ],
            bases=('constructions.fornecedor',),
        ),
        migrations.CreateModel(
            name='RecursosHumanos',
            fields=[
                ('fornecedor_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='constructions.fornecedor')),
                ('especializacao', models.CharField(max_length=512)),
            ],
            bases=('constructions.fornecedor',),
        ),
        migrations.CreateModel(
            name='Restaurante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=512)),
                ('email', models.CharField(max_length=512)),
                ('telefone', models.BigIntegerField()),
                ('morada', models.CharField(max_length=512)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('obra', models.ManyToManyField(to='constructions.obra')),
            ],
        ),
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reserva_inicio', models.DateField()),
                ('reserva_fim', models.DateField()),
                ('hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reservas', to='constructions.hotel')),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reservas', to='constructions.obra')),
            ],
        ),
        migrations.CreateModel(
            name='MedicaoEquip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medicao', models.FloatField()),
                ('unidade_medida', models.CharField(max_length=255)),
                ('funcionario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='constructions.obra')),
                ('reg_equipamento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='constructions.regequipamento')),
            ],
        ),
        migrations.AddField(
            model_name='hotel',
            name='obra',
            field=models.ManyToManyField(through='constructions.Reserva', to='constructions.obra'),
        ),
        migrations.CreateModel(
            name='GastosExtra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.TextField()),
                ('data', models.DateField()),
                ('preco', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='constructions.obra')),
            ],
        ),
        migrations.CreateModel(
            name='Foto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foto_bin', models.BinaryField()),
                ('tipo', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True, null=True)),
                ('funcionario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='constructions.obra')),
            ],
        ),
        migrations.AddField(
            model_name='fornecedor',
            name='obra',
            field=models.ManyToManyField(to='constructions.obra'),
        ),
        migrations.CreateModel(
            name='Carro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricula', models.CharField(max_length=512, unique=True)),
                ('marca', models.CharField(max_length=512)),
                ('ano', models.IntegerField(blank=True, null=True)),
                ('seguradora', models.CharField(max_length=512)),
                ('data_inicio', models.DateField()),
                ('data_fim', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('obra', models.ManyToManyField(to='constructions.obra')),
            ],
        ),
    ]
