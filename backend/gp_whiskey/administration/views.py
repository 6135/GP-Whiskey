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
                'status':'nao existem clientes registados'
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
            'status':'cliente registado com sucesso'
        }

        return Response(content)
    def delete(self, request):
        key = request.data.get('id')
        #key = 1
        record = Cliente.objects.get(id=key)

        record.delete()

        content = {
            'status':'cliente apagado com sucesso'
        }

        return Response(content)
