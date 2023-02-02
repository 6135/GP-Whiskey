from django.urls import path
from .views import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # path('token/obtain/', jwt_views.CustomTokenObtainPairView.as_view(), name='token_create'),
    # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('register', AuthUserRegistrationView.as_view(), name='register'),
    # path('users', AuthUserListView.as_view(), name='users'),
    path('cliente', ClienteAPIView.as_view()),
    path('funcionario', FuncionarioAPIView.as_view()),
    path('login', AuthUserLoginView.as_view(), name='login'),
]
