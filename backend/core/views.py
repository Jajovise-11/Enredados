from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import (
    Proveedor, CategoriaServicio, Servicio, Reserva, Valoracion,
    VestidoNovia, TrajeNovio, ComplementoNovia, ComplementoNovio,
    TareaAgenda, ItemPresupuesto
)
from .serializers import (
    ProveedorSerializer, CategoriaServicioSerializer, ServicioSerializer,
    ReservaSerializer, ValoracionSerializer,
    VestidoNoviaSerializer, TrajeNovioSerializer,
    ComplementoNoviaSerializer, ComplementoNovioSerializer,
    TareaAgendaSerializer, ItemPresupuestoSerializer
)


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    permission_classes = [permissions.AllowAny]


class CategoriaServicioViewSet(viewsets.ModelViewSet):
    queryset = CategoriaServicio.objects.all()
    serializer_class = CategoriaServicioSerializer
    permission_classes = [permissions.AllowAny]


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Servicio.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        if categoria:
            queryset = queryset.filter(categoria__id=categoria)
        return queryset


class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [permissions.AllowAny]


class ValoracionViewSet(viewsets.ModelViewSet):
    queryset = Valoracion.objects.all()
    serializer_class = ValoracionSerializer
    permission_classes = [permissions.AllowAny]


# NUEVOS VIEWSETS PARA PRODUCTOS
class VestidoNoviaViewSet(viewsets.ModelViewSet):
    queryset = VestidoNovia.objects.all()
    serializer_class = VestidoNoviaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = VestidoNovia.objects.all()
        estilo = self.request.query_params.get('estilo', None)
        precio_max = self.request.query_params.get('precio_max', None)
        
        if estilo:
            queryset = queryset.filter(estilo=estilo)
        if precio_max:
            queryset = queryset.filter(precio__lte=precio_max)
        
        return queryset


class TrajeNovioViewSet(viewsets.ModelViewSet):
    queryset = TrajeNovio.objects.all()
    serializer_class = TrajeNovioSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = TrajeNovio.objects.all()
        tipo = self.request.query_params.get('tipo', None)
        precio_max = self.request.query_params.get('precio_max', None)
        
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if precio_max:
            queryset = queryset.filter(precio__lte=precio_max)
        
        return queryset


class ComplementoNoviaViewSet(viewsets.ModelViewSet):
    queryset = ComplementoNovia.objects.all()
    serializer_class = ComplementoNoviaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = ComplementoNovia.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        
        return queryset


class ComplementoNovioViewSet(viewsets.ModelViewSet):
    queryset = ComplementoNovio.objects.all()
    serializer_class = ComplementoNovioSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = ComplementoNovio.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        
        return queryset


class TareaAgendaViewSet(viewsets.ModelViewSet):
    queryset = TareaAgenda.objects.all()
    serializer_class = TareaAgendaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = TareaAgenda.objects.all()
        usuario = self.request.query_params.get('usuario', None)
        categoria = self.request.query_params.get('categoria', None)
        prioridad = self.request.query_params.get('prioridad', None)
        
        if usuario:
            queryset = queryset.filter(usuario__id=usuario)
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        if prioridad:
            queryset = queryset.filter(prioridad=prioridad)
        
        return queryset


class ItemPresupuestoViewSet(viewsets.ModelViewSet):
    queryset = ItemPresupuesto.objects.all()
    serializer_class = ItemPresupuestoSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = ItemPresupuesto.objects.all()
        usuario = self.request.query_params.get('usuario', None)
        
        if usuario:
            queryset = queryset.filter(usuario__id=usuario)
        
        return queryset


# FUNCIONES DE AUTENTICACIÓN
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Registro de nuevos usuarios"""
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    
    if not username or not password:
        return Response(
            {'error': 'Username y password son obligatorios'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'El usuario ya existe'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        first_name=first_name,
        last_name=last_name
    )
    
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'message': 'Usuario creado exitosamente'
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Login de usuarios"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username y password son obligatorios'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if user is None:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'message': 'Login exitoso'
    })


@api_view(['GET'])
def profile(request):
    """Perfil del usuario autenticado"""
    user = request.user
    
    if not user.is_authenticated:
        return Response(
            {'error': 'No autenticado'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    })