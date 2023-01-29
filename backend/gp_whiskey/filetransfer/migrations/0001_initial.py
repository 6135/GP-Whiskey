# Generated by Django 4.1.5 on 2023-01-26 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('constructions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Relatorio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=512)),
                ('tipo', models.CharField(max_length=512)),
                ('report_bin', models.FileField(upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('obra_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='constructions.obra')),
            ],
        ),
    ]