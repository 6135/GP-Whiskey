from django.core.exceptions import BadRequest
import json


import base64
from django.core.files.base import ContentFile
from django.http import HttpResponse


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

    # ---- changes 30/1
    def get(self, request):
        if Foto.objects.exists():
            l = []
            for f in Foto.objects.all():
                dic = {}
                dic["id"] = f.id
                dic["tipo"] = f.tipo
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status':'nao existem fotos na obra'
            }
            return Response(content)

    # ---- changes 30/1
    def post(self, request):
        f = request.data.get("id")
        format, imgstr = request.data['foto_bin'].split(';base64,')
        ext = format.split('/')[-1]
        binary_image = base64.b64decode(imgstr)
        print(binary_image)


        f = Foto(id = request.data.get('id'), tipo = request.data['tipo'], report_bin = None)
        f.save()
        f.report_bin.save(request.data['id'], ContentFile(binary_image), save=True)

        content = {
            'status':'foto registada na base de dados'
        }

        return Response(content)

class DownloadFotoAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        print(request.data)
        key = request.data["id"]

        f = Foto.objects.get(id=key)

        print(f.id)
        file = f.foto_bin

        response = HttpResponse(file.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = 'attachment; filename={}'.format(file.name)

        return response
"""

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

"""
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


    def delete(self, request):
        key = request.data.get('id')
        r = RegEquipamento.objects.get(id=key)

        if r.arquivado == False:
            r.arquivado = True
            r.save(update_fields=['arquivado'])
            
            content = {'status': 'Equipamento arquivado com sucesso'}
        else:
            content = {'status': 'Equipamento NAO arquivado'}
        
        return Response(content)

class HotelAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = HotelSerializer

    def get(self, request):
        if Hotel.objects.exists():
            l = []
            for h in Hotel.objects.all():
                dic = {}
                dic["id"] = h.id
                dic["nome"] = h.nome
                dic["mail"] = h.mail
                dic["morada"] = h.morada
                l.append(dic)
            return Response(l)
        else:
            content = {
                'status': 'nao existem hoteis associados a obra'
            }
            return Response(content)
    
    def post(self, request):
        equip = Hotel(nome = request.data.get('nome'), email = request.data.get('email'), telefone = request.data.get('telefone'), morada = request.data.get('morada'))
        equip.save()

        content = {
            'status': 'Hotel registado na base de dados'
        }

        return Response(content)        
    
    def delete(self, request):
        key = request.data.get('id')
        r = Hotel.objects.get(id=key)

        if r.arquivado == False:
            r.arquivado = True
            r.save(update_fields=['arquivado'])
            
            content = {'status': 'Hotel arquivado com sucesso'}
        else:
            content = {'status': 'Hotel NAO arquivado'}
    
        return Response(content)
    


class ReservaAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ReservaSerializer

    def get(self, request):

        if Reserva.objects.exists():
            l = []
            for rh in Reserva.objects.all():
                dic = {}
                dic["id"] = rh.id
                dic["reserva_inicio"] = rh.reserva_inicio
                dic["reserva_fim"] = rh.reserva_fim
                l.append(dic)
            return Response(l)
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

        hotel = Hotel.objects.get(id=hotel_id)
        resHotel = Reserva(reserva_inicio = request.data.get("reserva_inicio"), reserva_fim = request.data.get("reserva_fim"), hotel=hotel)

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
                        dic["nr_obra"] = o.nr_obra
                        dic["transportadora"] = o.transportadora
                        l.append(dic)
            except:
                for o in Obra.objects.filter(encerrada=False):
                    dic = {}
                    dic["id"] = o.id
                    dic["nome"] = o.nome
                    dic["cliente"] = o.cliente.nome
                    dic["data_inicio"] = o.data_inicio
                    dic["data_conclusao"] = o.data_conclusao
                    dic["nr_obra"] = o.nr_obra
                    dic["transportadora"] = o.transportadora
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

        if record.encerrada == False:
            record.encerrada = True
            record.save(update_fields=['encerrada'])
            
            content = {'status': 'Obra encerrada com sucesso'}
        else:
            content = {'status': 'Obra NAO encerrada'}

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

        if record.arquivado == False:
            record.arquivado = True
            record.save(update_fields=['arquivado'])
            
            content = {'status': 'carro arquivado com sucesso'}
        else:
            content = {'status': 'carro NAO arquivado'}

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
"""
    def delete(self, request):
        key = request.data.get('id')
        # key = 1
        record = GastosExtra.objects.get(id=key)

        if record.arquivado == False:
            record.arquivado = True
            record.save(update_fields=['arquivado'])
            
            content = {'status': 'GastosExtra arquivado com sucesso'}
        else:
            content = {'status': 'GastosExtra NAO arquivado'}

        return Response(content)
"""

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
            'telefone'), morada=request.data.get('morada'))
        r.save()

        content = {
            'status': 'Restaurante registada na base de dados'
        }

        return Response(content)

    def delete(self, request):
        key = request.data.get('id')
        # key = 1
        record = Restaurante.objects.get(id=key)

        if record.arquivado == False:
            record.arquivado = True
            record.save(update_fields=['arquivado'])
            
            content = {'status': 'Restaurante arquivado com sucesso'}
        else:
            content = {'status': 'Restaurante NAO arquivado'}

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

    
    def delete(self, request):
        key = request.data.get('id')
        r = Fornecedor.objects.get(id=key)

        if r.arquivado == False:
            r.arquivado = True
            r.save(update_fields=['arquivado'])
            
            content = {'status': 'Fornecedor arquivado com sucesso'}
        else:
            content = {'status': 'Fornecedor NAO arquivado'}
        return Response(content)


#Associações

class AssociarFornecedorAObraAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        print(request.data)
        obra_id = request.data.get('obra_id')
        fornecedor_id = request.data.get('fornecedor_id')

        o = Obra.objects.get(id = obra_id)
        f = Fornecedor.objects.get(id = fornecedor_id)

        f.obra.add(o)
        #o.fornecedores_all.add(f)

        content = {'status': 'Fornecedor associado com sucesso'}
        return Response(content)

    def delete(self, request):
        obra_id = request.data.get('obra_id')
        fornecedor_id = request.data.get('fornecedor_id')

        o = Obra.objects.get(id = obra_id)
        f = Fornecedor.objects.get(id = fornecedor_id)

        f.obra.remove(o)

        content = {'status': 'Fornecedor desassociado com sucesso'}
        return Response(content)



class AssociarViaturaAObraAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        obra_id = request.data.get('obra_id')
        carro_id = request.data.get('carro_id')

        o = Obra.objects.get(id = obra_id)
        c = Carro.objects.get(id = carro_id)

        c.obra.add(o)

        content = {'status': 'Viatura associada com sucesso'}
        return Response(content)

    def delete(self, request):
        obra_id = request.data.get('obra_id')
        carro_id = request.data.get('carro_id')

        o = Obra.objects.get(id = obra_id)
        c = Carro.objects.get(id = carro_id)

        c.obra.remove(o)

        content = {'status': 'Viatura desassociado com sucesso'}
        return Response(content)


class AssociarRestauranteAObraAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        obra_id = request.data.get('obra_id')
        restaurante_id = request.data.get('restaurante_id')

        o = Obra.objects.get(id = obra_id)
        r = Restaurante.objects.get(id = restaurante_id)

        r.obra.add(o)

        content = {'status': 'Restaurante associado com sucesso'}
        return Response(content)

    def delete(self, request):
        obra_id = request.data.get('obra_id')
        restaurante_id = request.data.get('restaurante_id')

        o = Obra.objects.get(id = obra_id)
        r = Restaurante.objects.get(id = restaurante_id)

        r.obra.remove(o)

        content = {'status': 'Restaurante desassociado com sucesso'}
        return Response(content)

class AssociarMedicaoEquipamentoAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        obra_id = request.data.get('obra_id')
        reg_equipamento_id = request.data.get('reg_equipamento_id')
        funcionario_id = request.data.get('funcionario_id')
        medicao_valor = request.data.get('medicao')
        unidade_medida_valor = request.data.get('unidade_medida')

        o = Obra.objects.get(id = obra_id)
        r = RegEquipamento.objects.get(id = reg_equipamento_id)
        f = Funcionario.objects.get(id = funcionario_id)
        m = MedicaoEquip(obra = o, reg_equipamento = r, funcionario = f, medicao = medicao_valor, unidade_medida_valor = unidade_medida_valor)

        m.save()

        content = {'status': 'Medição guardada com sucesso'}
        return Response(content)


class AssociarReservaAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        obra_id = request.data.get('obra_id')
        hotel_id = request.data.get('hotel_id')
        reserva_inicio_valor = request.data.get('reserva_inicio')
        reserva_fim_valor = request.data.get('reserva_fim')
        
        o = Obra.objects.get(id = obra_id)
        h = Hotel.objects.get(id = hotel_id)
        r = Reserva(obra = o, hotel = h, reserva_inicio = reserva_inicio_valor, reserva_fim = reserva_fim_valor)

        r.save()

        content = {'status': 'Reserva de Hotel guardada com sucesso'}
        return Response(content)
