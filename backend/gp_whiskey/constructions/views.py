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

class FotoAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = FotoSerializer

    def get(self, request):

        if Foto.objects.exists():
            dic = {}
            for f in Foto.objects.all():
                dic["id"] = f.id
                dic["tipo"] = f.tipo
                dic["foto_bin"] = f.foto_bin
            return Response(dic)
        else:
            content = {
                'status':'nao existem fotos na obra'
            }
            return Response(content)

    def post(self, request):

        f = Foto(id = request.data.get('id'), foto_bin = request.data.get('foto_bin'), tipo = request.data.get('tipo'))
        f.save()

        content = {
            'status':'foto registada na base de dados'
        }

        return Response(content)


class RegEquipamentoAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = RegEquipamentoSerializer

    def get(self, request):

        if RegEquipamento.objects.exists():
            dic = {}
            for equip in RegEquipamento.objects.all():
                dic["id"] = equip.id
                dic["nome_equip"] = f.nome_equip
            return Response(dic)
        else:
            content = {
                'status':'nao existem equipamentos na obra'
            }
            return Response(content)

    def post(self, request):
        equip = RegEquipamento(nome_equip = request.data.get('nome_equip'))
        equip.save()

        content = {
            'status': 'Equipamento registado na base de dados'
        }

        return Response(content)

class HotelAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = HotelSerializer

    def get(self, request):

        if Hotel.objects.exists():
            dic = {}
            for h in Hotel.objects.all():
                dic["id"] = h.id
                dic["nome"] = h.nome
                dic["mail"] = h.mail
                dic["morada"] = h.morada
            return Response(dic)
        else:
            content = {
                'status':'nao existem hoteis associados a obra'
            }
            return Response(content)


class TesteAPIView(APIView):
    permission_classes = (AllowAny,)
    
    def get(self, request, format=None):
        content = {
            'teste': 'isto e um teste'
        }

        return Response(content)

class ReservaHotelAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ReservaHotelSerializer

    def get(self, request):
        if ReservaHotel.objects.exists():
            dic = {}
            for rh in ReservaHotel.objects.all():
                dic["id"] = rh.id
                dic["reserva_inicio"] = rh.reserva_inicio
                dic["reserva_fim"] = rh.reserva_fim
            return Response(dic)
        else:
            content = {
                'status':'nao existem reservas hoteis associados a obra'
            }
            return Response(content)

    def post(self, request):

        hotel_id = request.data.get("hotel_id")
        hotel = Hotel.objects.filter(id=hotel_id)
        resHotel = ReservaHotel(request.data.get("id"), request.data.get("reserva_inicio"), request.data.get("reserva_fim"), hotel=hotel)
        resHotel.save()

        content = {
            'status':'reserva efetuada com sucesso'
        }

        return Response(content)
    
class ObraAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ObraSerializer

    def post(self, request):
        """o = Obra(id=request.data.get('id'), data_inicio=request.data.get('data_inicio'), data_conclusao=request.data.get('data_conclusao'))
        o.save()"""

        content = {
            'status':'obra criada com sucesso'
        }

        return Response(content)

    def get(self, request):
        if Obra.objects.exists():
            dic = {}
            for o in Obra.objects.all():
                dic["id"] = o.id
                dic["data_inicio"] = o.data_inicio
                dic["data_conclusao"] = o.data_conclusao
            return Response(dic)
        else:
            content = {
                'status':'nao existem obras'
            }
        return Response(content)
