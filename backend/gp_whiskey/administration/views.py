from django.core.exceptions import BadRequest
import json
from gp_whiskey.settings import SIMPLE_JWT
import jwt
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
    permission_classes = (IsAuthenticated, )
    serializer_class = ClienteSerializer

    def get(self, request):

        if Cliente.objects.exists():
            l = []
            try:
                if request.GET['arquivado']: 
                    for c in Cliente.objects.filter(arquivado=True):
                        dic = {}
                        dic["id"] = c.id
                        dic["nome"] = c.nome
                        dic["mail"] = c.mail
                        dic["publico"] = c.publico
                        dic["morada"] = c.morada
                        dic["arquivado"] = c.arquivado
                        l.append(dic)
            except:                
                for c in Cliente.objects.filter(arquivado=False):
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
                'status': 404
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
            'status': 201
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        #key = 3
        record = Cliente.objects.get(id=key)
        print(record.arquivado)

        if record.arquivado == False:
            record.arquivado = True
            record.save(update_fields=['arquivado'])

            content = {
                'status': 201
            }
        else:
            content = {'status': 401}

        return Response(content)

class FuncionarioAPIView(APIView):
    permission_classes = (IsAuthenticated, )
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
                'status': 404
            }
            return Response(content)

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
        

    def delete(self, request):
        key = request.data.get('id')
        #key = 1
        record = Funcionario.objects.get(id=key)

        if record.arquivado == False:
            record.arquivado = True
            record.save(update_fields=['arquivado'])

            content = {
                'status': 200
            }
        else:
            content = {'status': 401}

        return Response(content)

class AuthUserRegistrationView(APIView):
    serializer_class = AuthUserRegistrationSerializer
    permission_classes = (IsAuthenticated, )

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
                },
            }

            return Response(response, status=status_code)


class AuthUserListView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        payload = jwt.decode(request.META['HTTP_AUTHORIZATION'].split(' ')[1],SIMPLE_JWT['SIGNING_KEY'],algorithms=[SIMPLE_JWT['ALGORITHM']])
        user = Funcionario.objects.get(id=payload['user_id'])
        if user.role != 1:
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)
        else:
            users = Funcionario.objects.all()
            serializer = self.serializer_class(users, many=True)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Successfully fetched users',
                'users': serializer.data
            }
            return Response(response, status=status.HTTP_200_OK)