# Generated by Django 4.1.5 on 2023-01-30 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructions', '0002_alter_carro_matricula'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='obras',
            field=models.ManyToManyField(to='constructions.obra'),
        ),
    ]