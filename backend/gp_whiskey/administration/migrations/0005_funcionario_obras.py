# Generated by Django 4.1.3 on 2023-01-21 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructions', '0002_remove_restaurante_localizacao'),
        ('administration', '0004_remove_funcionario_obras'),
    ]

    operations = [
        migrations.AddField(
            model_name='funcionario',
            name='obras',
            field=models.ManyToManyField(to='constructions.obra'),
        ),
    ]
