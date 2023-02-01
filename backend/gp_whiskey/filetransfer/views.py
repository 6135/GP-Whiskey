from django.core.exceptions import BadRequest

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import base64
from django.core.files.base import ContentFile
from django.http import HttpResponse

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
                #dic["obra_id"] = r.obra_id.id
                dic["nome"] = r.nome
                #dic["report_bin"] = r.report_bin
                dic["tipo"] = r.tipo
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status':'nao existem relatorios na obra'
            }
            return Response(content)

    def post(self, request):
        
        #key = request.data['obra_id']
        #alterar isto
        o = Obra.objects.get(id=1)

        format, imgstr = request.data['report_bin'].split(';base64,')
        ext = format.split('/')[-1]
        binary_image = base64.b64decode(imgstr)

        r = Relatorio(obra_id = o, nome = request.data['nome'], tipo = request.data['tipo'], report_bin = None)
        r.save()
        r.report_bin.save(request.data['nome'], ContentFile(binary_image), save=True)

        content = {
            'status':'relatorio guardado'
        }

        return Response(content)

class DownloadRelatorioAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        #print(request.data)
        key = request.data["id"]

        r = Relatorio.objects.get(id=key)

        print(r.nome)
        file = r.report_bin

        #ate aqui ta tudo

        response = HttpResponse(file.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = 'attachment; filename={}'.format(file.name)

        #return Response(dic)
        return response