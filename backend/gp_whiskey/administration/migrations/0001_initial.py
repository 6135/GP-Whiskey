# Generated by Django 4.1.5 on 2023-02-01 01:37

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=512)),
                ('mail', models.CharField(max_length=512)),
                ('publico', models.BooleanField(default=False)),
                ('morada', models.CharField(max_length=512)),
                ('arquivado', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Funcionario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='Public identifier')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=30)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('role', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Admin'), (2, 'Engineer'), (3, 'Employee')], default=3, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('seguro_saude', models.CharField(max_length=512)),
                ('data_inicio', models.DateTimeField(default=django.utils.timezone.now)),
                ('data_conclusao', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_by', models.EmailField(max_length=254)),
                ('modified_by', models.EmailField(max_length=254)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('obra',models.ManyToManyField(to='constructions.obra')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
        ),
    ]
