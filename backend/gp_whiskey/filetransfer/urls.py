from django.urls import path
from .views import *

urlpatterns = [
    path('relatorio', RelatorioAPIView.as_view()),
    path('downloadRelatorio', DownloadRelatorioAPIView.as_view()),
]