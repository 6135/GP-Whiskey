# Generated by Django 4.1.3 on 2022-12-02 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('etar', '0002_alter_foto_foto_bin'),
    ]

    operations = [
        migrations.CreateModel(
            name='Obra',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('data_inicio', models.DateField()),
                ('data_conclusao', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='foto',
            name='obra',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='etar.obra'),
        ),
        migrations.AddField(
            model_name='hotel',
            name='obra',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='etar.obra'),
        ),
        migrations.AddField(
            model_name='regequipamento',
            name='obra',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='etar.obra'),
        ),
        migrations.AddField(
            model_name='reservahotel',
            name='obra',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='etar.obra'),
        ),
    ]