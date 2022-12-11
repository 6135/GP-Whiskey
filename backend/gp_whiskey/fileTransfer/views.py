from django.core.exceptions import BadRequest
import json

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *
from django.db.models import Count

class RelatorioAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = RelatorioSerializer

    def get(self, request):

        if Relatorio.objects.exists():
            dic = {}
            for r in Relatorio.objects.all():
                dic["id"] = r.id
                dic["nome"] = r.nome
                dic["report_bin"] = r.report_bin
                dic["tipo"] = r.tipo

            return Response(dic)
        else:
            content = {
                'status':'nao existem relatorios na obra'
            }
            return Response(content)

    def post(self, request):
        dic = {}

        #print(request.data['report_bin'])

        dic["nome"] = request.data['nome']
        dic["report_bin"] = request.data['report_bin']
        dic["tipo"] = request.data['tipo']

        content = {
            'status':'relatorio printado'
        }

        return Response(dic)