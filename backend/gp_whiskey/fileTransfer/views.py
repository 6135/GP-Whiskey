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
            l = []
            for r in Relatorio.objects.all():
                dic = {}
                dic["id"] = r.id
                dic["obra_id"] = r.obra_id.id
                dic["nome"] = r.nome
                dic["report_bin"] = r.report_bin
                dic["tipo"] = r.tipo
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status':'nao existem relatorios na obra'
            }
            return Response(content)

    def post(self, request):

        o = Obra.objects.get(id=1)
        
        r = Relatorio(obra_id = o, nome = request.data['nome'], report_bin = request.data['report_bin'], tipo = request.data['tipo'])
        r.save()

        #print(request.data['report_bin'])
        """dic = {}
        dic["nome"] = request.data['nome']
        dic["report_bin"] = request.data['report_bin']
        dic["tipo"] = request.data['tipo']"""

        content = {
            'status':'relatorio printado'
        }

        return Response(content)