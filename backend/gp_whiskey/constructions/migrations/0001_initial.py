# Generated by Django 4.1.4 on 2022-12-07 23:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("administration", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Hotel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255)),
                ("telefone", models.BigIntegerField()),
                ("morada", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("update_at", models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Obra",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome", models.CharField(max_length=512)),
                ("data_inicio", models.DateTimeField()),
                ("data_conclusao", models.DateTimeField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "cliente",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="administration.cliente",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="RegEquipamento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome_equip", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("update_at", models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Restaurante",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome", models.CharField(max_length=512)),
                ("email", models.CharField(max_length=512)),
                ("telefone", models.BigIntegerField()),
                ("morada", models.CharField(max_length=512)),
                ("localizacao", models.CharField(max_length=512)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("obras", models.ManyToManyField(to="constructions.obra")),
            ],
        ),
        migrations.CreateModel(
            name="ReservaHotel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reserva_inicio", models.DateField()),
                ("reserva_fim", models.DateField()),
                (
                    "hotel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.hotel",
                    ),
                ),
                (
                    "obra",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.obra",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="MedicaoEquip",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("medicao", models.FloatField()),
                ("unidade_medida", models.CharField(max_length=255)),
                (
                    "funcionario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="administration.funcionario",
                    ),
                ),
                (
                    "obra",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.obra",
                    ),
                ),
                (
                    "reg_equipamento",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.regequipamento",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="GastosExtra",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("descricao", models.TextField()),
                ("data", models.DateField()),
                ("preco", models.FloatField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "obra",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.obra",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Foto",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("foto_bin", models.BinaryField()),
                ("tipo", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("update_at", models.DateTimeField(auto_now=True, null=True)),
                (
                    "funcionario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="administration.funcionario",
                    ),
                ),
                (
                    "obra",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.obra",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Fornecedor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome", models.CharField(max_length=512)),
                ("telefone", models.BigIntegerField()),
                ("email", models.CharField(max_length=512)),
                ("morada", models.CharField(max_length=512)),
                ("localizacao", models.CharField(max_length=512)),
                ("created_at", models.DateTimeField()),
                ("updated_at", models.DateTimeField()),
                ("obras", models.ManyToManyField(to="constructions.obra")),
            ],
        ),
        migrations.CreateModel(
            name="Equipamento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "fornecedor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="constructions.fornecedor",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Carro",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("matricula", models.CharField(max_length=512)),
                ("marca", models.CharField(max_length=512)),
                ("ano", models.IntegerField(blank=True, null=True)),
                ("seguradora", models.CharField(max_length=512)),
                ("data_inicio", models.DateField()),
                ("data_fim", models.DateField()),
                ("created_at", models.DateTimeField()),
                ("updated_at", models.DateTimeField()),
                ("obras", models.ManyToManyField(to="constructions.obra")),
            ],
        ),
    ]
