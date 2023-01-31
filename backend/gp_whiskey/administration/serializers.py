from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('nome', 'mail', 'publico', 'morada', 'arquivado')

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ('nome', 'email', 'cargo', 'seguro_saude', 'data_inicio', 'data_conclusao')

class AuthUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = (
            'email',
            'password',
            'role'
        )

    def create(self, validated_data):
        auth_user = Funcionario.objects.create_user(**validated_data)
        return auth_user

class AuthUserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        #TODO: verify
        pass

    def update(self, instance, validated_data):
        #TODO: verify
        pass

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            refresh = RefreshToken.for_user(user)
            
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            update_last_login(None, user)

            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
                'full_name': user.get_full_name(),
                'role': user.role,
            }

            return validation
        except Funcionario.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")



class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = (
            'email',
            'role'
        )