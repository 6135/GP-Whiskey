# Generated by Django 4.1.3 on 2022-12-03 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='obra',
            name='restaurantes',
            field=models.ManyToManyField(to='constructions.restaurante'),
        ),
    ]