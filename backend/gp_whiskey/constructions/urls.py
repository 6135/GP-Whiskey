from django.urls import path
from .views import *

urlpatterns = [
    path('foto', FotoAPIView.as_view()),
    path('reshotel', ReservaAPIView.as_view()),
    path('obra', ObraAPIView.as_view()),
    path('detailsobra', DetailsObraAPIView.as_view()),
    path('carro', CarroAPIView.as_view()),
    path('gastosextra', GastosExtraAPIView.as_view()),
    path('restaurante', RestauranteAPIView.as_view()),
    path('fornecedor', FornecedorAPIView.as_view()),
    path('associarfornecedoraobra', AssociarFornecedorAObraAPIView.as_view()),
    path('associarviaturaaobra', AssociarViaturaAObraAPIView.as_view()),
    path('associarrestauranteobra', AssociarRestauranteAObraAPIView.as_view()),
    path('associarmedicaoequipamento', AssociarMedicaoEquipamentoAPIView.as_view()),
    path('associarreservahotel', AssociarReservaHotelAPIView.as_view()),
]
