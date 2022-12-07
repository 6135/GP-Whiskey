from django.urls import path
from .views import *

urlpatterns = [
    path('api/foto', FotoAPIView.as_view()),
    path('api/teste', TesteAPIView.as_view()),
    path('api/reshotel', ReservaHotelAPIView.as_view()),
    path('api/obra', ObraAPIView.as_view()),
]
