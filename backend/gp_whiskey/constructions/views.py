from django.core.exceptions import BadRequest
import json

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from administration.serializers import FuncionarioSerializer


from distutils.util import strtobool

from .serializers import *
from .models import *
from administration.models import *


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
                'status': 'nao existem fotos na obra'
            }
            return Response(content)

    def post(self, request):

        f = Foto(id=request.data.get('id'), foto_bin=request.data.get(
            'foto_bin'), tipo=request.data.get('tipo'))
        f.save()

        content = {
            'status': 'foto registada na base de dados'
        }

        return Response(content)


class RegEquipamentoAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = RegEquipamentoSerializer

    def get(self, request):

        if RegEquipamento.objects.exists():
            l = []
            for equip in RegEquipamento.objects.all():
                dic = {}
                dic["id"] = equip.id
                dic["nome_equip"] = f.nome_equip
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem equipamentos na obra'
            }
            return Response(content)

    def post(self, request):
        equip = RegEquipamento(nome_equip=request.data.get('nome_equip'))
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
                'status': 'nao existem hoteis associados a obra'
            }
            return Response(content)


class ReservaAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ReservaSerializer

    def get(self, request):
        if Reserva.objects.exists():
            dic = {}
            for rh in Reserva.objects.all():
                dic["id"] = rh.id
                dic["reserva_inicio"] = rh.reserva_inicio
                dic["reserva_fim"] = rh.reserva_fim
            return Response(dic)
        else:
            content = {
                'status': 'nao existem reservas hoteis associados a obra'
            }
            return Response(content)

    def post(self, request):

        hotel_id = request.data.get("hotel_id")
        hotel = Hotel.objects.filter(id=hotel_id)
        resHotel = Reserva(request.data.get("id"), request.data.get(
            "reserva_inicio"), request.data.get("reserva_fim"), hotel=hotel)
        resHotel.save()

        content = {
            'status': 'reserva efetuada com sucesso'
        }

        return Response(content)


class ObraAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ObraSerializer

    def post(self, request):

        bool_e = request.data.get('encerrada')

        if bool_e == None:
            bool_e = "False"

        c = Cliente.objects.get(id=request.data.get('cliente'))

        o = Obra(cliente=c, nome=request.data.get('nome'),
                 data_inicio=request.data.get('data_inicio'), data_conclusao=request.data.get('data_conclusao'),
                 encerrada=strtobool(bool_e))
        o.save()

        content = {
            'status': 'obra criada com sucesso'
        }

        return Response(content)

    def get(self, request):
        if Obra.objects.exists():
            l = []
            try:
                if request.GET['encerrada']:
                    for o in Obra.objects.filter(encerrada=True):
                        dic = {}
                        dic["id"] = o.id
                        dic["nome"] = o.nome
                        dic["cliente"] = o.cliente.nome
                        dic["data_inicio"] = o.data_inicio
                        dic["data_conclusao"] = o.data_conclusao
                        l.append(dic)
            except:
                for o in Obra.objects.filter(encerrada=False):
                    dic = {}
                    dic["id"] = o.id
                    dic["nome"] = o.nome
                    dic["cliente"] = o.cliente.nome
                    dic["data_inicio"] = o.data_inicio
                    dic["data_conclusao"] = o.data_conclusao
                    l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem obras'
            }
        return Response(content)

    def delete(self, request):
        # key = request.data.get('id')
        key = 1
        record = Obra.objects.get(id=key)

        record.delete()

        content = {
            'status': 'Obra apagada com sucesso'
        }

        return Response(content)


class DetailsObraAPIView(APIView):
    # TODO: Change back to isAuthenicated when done testing
    permission_classes = (AllowAny, )

    def post(self, request):

        print("TESTE: " + str(request.data['obraid']))
        o = Obra.objects.prefetch_related(
            'funcionario_set').get(id=request.data['obraid'])

        dic = {}

        # OBRA_DETALHES
        dic["obra_nome"] = o.nome
        dic["obra_data_inicio"] = o.data_inicio
        dic["obra_data_conclusao"] = o.data_conclusao

        if o.encerrada == False:
            dic["encerrada"] = "Nao"
        else:
            dic["encerrada"] = "Sim"

        # CLIENTE
        dic["cliente_nome"] = o.cliente.nome

        # FUNCIONARIOS
        # dicionario de dicionario
        try:
            dic["funcionarios"] = [FuncionarioSerializer(
                f).data for f in o.funcionario_set.all()]
        except Exception as e:
            print(e)
            dic["funcionarios"] = []

        # CARROS
        # dicionario de dicionario
        try:
            dic["carros"] = [CarroSerializer(
                c).data for c in o.carro_set.all()]
        except Exception as e:
            print(e)
            dic["carros"] = []

        # RESTAURANTES
        # dicionario de dicionario
        try:
            dic["restaurantes"] = [RestauranteSerializer(
                r).data for r in o.restaurante_set.all()]
        except Exception as e:
            print(e)
            dic["restaurantes"] = []

        # FORNECEDORES
        # dicionario de dicionario
        try:
            dic["fornecedores"] = [FornecedorSerializer(
                f).data for f in o.fornecedor_set.all()]
        except Exception as e:
            print(e)
            dic["fornecedores"] = []

        # HOTEIS
        try:
            hoteis = o.hoteis
            # Conversly, to obtain obras from a hotel, use h.obras
            dic["hoteis"] = [HotelSerializer(h).data | {"reservas": ReservaSerializer(
                instance=Reserva.objects.filter(hotel=h, obra=o), many=True).data} for h in hoteis]

        except Exception as e:
            print(e)
            dic["hoteis"] = []

        return Response(dic)


class CarroAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = CarroSerializer

    def get(self, request):

        if Carro.objects.exists():
            l = []
            for h in Carro.objects.all():
                dic = {}
                dic["matricula"] = h.matricula
                dic["marca"] = h.marca
                dic["ano"] = h.ano
                dic["seguradora"] = h.seguradora
                dic["data_inicio"] = h.data_inicio
                dic["data_fim"] = h.data_fim
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem carros'
            }
            return Response(content)

    def post(self, request):
        c = Carro(matricula=request.data.get('matricula'), marca=request.data.get('marca'), ano=request.data.get(
            'ano'), seguradora=request.data.get('seguradora'), data_inicio=request.data.get('data_inicio'), data_fim=request.data.get('data_fim'))
        c.save()

        content = {
            'status': 'carro registado na base de dados'
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        # key = 1
        record = Carro.objects.get(id=key)

        record.delete()

        content = {
            'status': 'carro apagado com sucesso'
        }

        return Response(content)


class GastosExtraAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = GastosExtraSerializer

    def get(self, request):
        if GastosExtra.objects.exists():
            l = []
            for h in GastosExtra.objects.all():
                dic = {}
                dic["descricao"] = h.descricao
                dic["data"] = h.data
                dic["preco"] = h.preco
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem GastosExtra associados a obra'
            }
            return Response(content)

    def post(self, request):

        g = GastosExtra(descricao=request.data.get('descricao'), data=request.data.get(
            'data'), preco=request.data.get('preco'))
        g.save()

        content = {
            'status': 'GastosExtra registada na base de dados'
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        # key = 1
        record = GastosExtra.objects.get(id=key)

        record.delete()

        content = {
            'status': 'GastosExtra apagado com sucesso'
        }

        return Response(content)


class RestauranteAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = RestauranteSerializer

    def get(self, request):
        if Restaurante.objects.exists():
            l = []
            for h in Restaurante.objects.all():
                dic = {}
                dic["nome"] = h.nome
                dic["email"] = h.email
                dic["telefone"] = h.telefone
                dic["morada"] = h.morada
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem Restaurantes'
            }
            return Response(content)

    def post(self, request):

        r = Restaurante(nome=request.data.get('nome'), email=request.data.get('email'), telefone=request.data.get(
            'telefone'), morada=request.data.get('morada'), localizacao=request.data.get('localizacao'))
        r.save()

        content = {
            'status': 'Restaurante registada na base de dados'
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        # key = 1
        record = Restaurante.objects.get(id=key)

        record.delete()

        content = {
            'status': 'Restaurante apagado com sucesso'
        }

        return Response(content)


class FornecedorAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = FornecedorSerializer

    def get(self, request):
        if Fornecedor.objects.exists():
            l = []
            for h in Fornecedor.objects.all():
                dic = {}
                dic["nome"] = h.nome
                dic["email"] = h.email
                dic["telefone"] = h.telefone
                dic["morada"] = h.morada
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem Fornecedores'
            }
            return Response(content)

    def post(self, request):

        if (request.data.get('tipo') == "Recursos Humanos"):
            f = RecursosHumanos(nome=request.data.get('nome'), telefone=request.data.get('telefone'), email=request.data.get('email'),
                                morada=request.data.get('morada'), especializacao=request.data.get('especializacao'))
            f.save()

        elif (request.data.get('tipo') == "Equipamentos"):
            f = Equipamento(nome=request.data.get('nome'), telefone=request.data.get('telefone'), email=request.data.get('email'),
                            morada=request.data.get('morada'))
            f.save()

        content = {
            'status': 'Fornecedor registado na base de dados'
        }

        return Response(content)
