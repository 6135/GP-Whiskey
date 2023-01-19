from django.urls import path
from .views import *

urlpatterns = [
    path('foto', FotoAPIView.as_view()),
    path('reshotel', ReservaHotelAPIView.as_view()),
    path('obra', ObraAPIView.as_view()),
    path('detailsobra', DetailsObraAPIView.as_view()),
]
