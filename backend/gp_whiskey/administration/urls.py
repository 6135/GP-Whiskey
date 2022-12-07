from django.urls import path
from .views import *

urlpatterns = [
    path('api/cliente', ClienteAPIView.as_view()),

]
