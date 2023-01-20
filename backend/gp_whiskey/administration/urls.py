from django.urls import path
from .views import *

urlpatterns = [
    path('cliente', ClienteAPIView.as_view()),
    path('funcionario', FuncionarioAPIView.as_view()),
]
