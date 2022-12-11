from django.urls import path
from .views import *

urlpatterns = [
    path('api/relatorio', RelatorioAPIView.as_view()),
]