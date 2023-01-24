from django.core.exceptions import BadRequest
import json

from distutils.util import strtobool

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *
from django.db.models import Count


class ClienteAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ClienteSerializer

    def get(self, request):

        if Cliente.objects.exists():
            l = []
            for c in Cliente.objects.all():
                dic = {}
                dic["id"] = c.id
                dic["nome"] = c.nome
                dic["mail"] = c.mail
                dic["publico"] = c.publico
                dic["morada"] = c.morada
                dic["arquivado"] = c.arquivado
                l.append(dic)

            return Response(l)
        else:
            content = {
                'status': 'nao existem clientes registados'
            }

            return Response(content)

    def post(self, request):
        bool_p = request.data.get('publico')
        bool_a = request.data.get('arquivado')

        if bool_p == None:
            bool_p = "False"
        if bool_a == None:
            bool_a = "False"

        c = Cliente(nome=request.data.get('nome'), mail=request.data.get('mail'), publico=strtobool(bool_p),
                    morada=request.data.get('morada'), arquivado=strtobool(bool_a))
        c.save()

        content = {
            'status': 'cliente registado com sucesso'
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        #key = 1
        record = Cliente.objects.get(id=key)

        record.delete()

        content = {
            'status': 'cliente apagado com sucesso'
        }

        return Response(content)

class FuncionarioAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = FuncionarioSerializer

    def get(self, request): 
        if Funcionario.objects.exists():
            l = []
            for f in Funcionario.objects.all():
                dic = {}
                dic["nome"] = f.nome
                dic["email"] = f.email
                dic["cargo"] = f.cargo
                dic["seguro_saude"] = f.seguro_saude
                dic["data_inicio"] = f.data_inicio
                dic["data_conclusao"] = f.data_conclusao
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status':'nao existem funcionarios'
            }
            return Response(content)

    def post(self, request):

        f = Funcionario(nome = request.data.get('nome'), email = request.data.get('email'), cargo = request.data.get('cargo'), seguro_saude = request.data.get('seguro_saude'), data_inicio = request.data.get('data_inicio'), data_conclusao = request.data.get('data_conclusao'))
        f.save()

        content = {
            'status':'funcionario registado na base de dados'
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        #key = 1
        record = Funcionario.objects.get(id=key)

        record.delete()

        content = {
            'status': 'funcionario apagado com sucesso'
        }

        return Response(content)

class AuthUserRegistrationView(APIView):
    serializer_class = AuthUserRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response, status=status_code)

class AuthUserLoginView(APIView):
    serializer_class = AuthUserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'email': serializer.data['email'],
                    'role': serializer.data['role']
                }
            }

            return Response(response, status=status_code)


class AuthUserListView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if user.role != 1:
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)
        else:
            users = UserEmployer.objects.all()
            serializer = self.serializer_class(users, many=True)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Successfully fetched users',
                'users': serializer.data

            }
            return Response(response, status=status.HTTP_200_OK)