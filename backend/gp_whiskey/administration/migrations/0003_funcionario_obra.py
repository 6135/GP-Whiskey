# Generated by Django 4.1.5 on 2023-01-31 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructions', '0002_remove_obra_funcionarios_alter_obra_data_conclusao_and_more'),
        ('administration', '0002_alter_funcionario_data_conclusao_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='funcionario',
            name='obra',
            field=models.ManyToManyField(to='constructions.obra'),
        ),
    ]
