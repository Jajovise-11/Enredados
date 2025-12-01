from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import transaction

from .models import (
    Proveedor, CategoriaServicio, Servicio, Reserva, Valoracion,
    VestidoNovia, TrajeNovio, ComplementoNovia, ComplementoNovio,
    TareaAgenda, ItemPresupuesto, PerfilProveedor
)
from .serializers import (
    ProveedorSerializer, CategoriaServicioSerializer, ServicioSerializer,
    ReservaSerializer, ValoracionSerializer,
    VestidoNoviaSerializer, TrajeNovioSerializer,
    ComplementoNoviaSerializer, ComplementoNovioSerializer,
    TareaAgendaSerializer, ItemPresupuestoSerializer,
    PerfilProveedorSerializer, UserSerializer
)


# ========== REGISTRO Y AUTENTICACIÓN ==========
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Registro de usuarios normales"""
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
        'es_proveedor': False,
        'message': 'Usuario creado exitosamente'
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_proveedor(request):
    """Registro de usuarios proveedores"""
    # Datos de usuario
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    
    # Datos de proveedor
    nombre_empresa = request.data.get('nombre_empresa')
    descripcion = request.data.get('descripcion', '')
    telefono = request.data.get('telefono', '')
    direccion = request.data.get('direccion', '')
    ciudad = request.data.get('ciudad', '')
    cif_nif = request.data.get('cif_nif', '')
    
    if not username or not password or not nombre_empresa:
        return Response(
            {'error': 'Username, password y nombre de empresa son obligatorios'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'El usuario ya existe'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        with transaction.atomic():
            # Crear usuario
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )
            
            # Crear perfil de proveedor
            perfil = PerfilProveedor.objects.create(
                user=user,
                nombre_empresa=nombre_empresa,
                descripcion=descripcion,
                telefono=telefono,
                direccion=direccion,
                ciudad=ciudad,
                cif_nif=cif_nif
            )
            
            # Crear también un registro en Proveedor para compatibilidad con Servicios
            proveedor = Proveedor.objects.create(
                nombre=nombre_empresa,
                descripcion=descripcion,
                telefono=telefono,
                email=email,
                direccion=direccion,
                ciudad=ciudad,
                usuario_proveedor=user
            )
            
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'es_proveedor': True,
                'perfil_proveedor': PerfilProveedorSerializer(perfil).data,
                'message': 'Proveedor registrado exitosamente'
            }, status=status.HTTP_201_CREATED)
            
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


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
    
    # Verificar si es proveedor
    es_proveedor = hasattr(user, 'perfil_proveedor')
    
    response_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'es_proveedor': es_proveedor,
        'message': 'Login exitoso'
    }
    
    if es_proveedor:
        response_data['perfil_proveedor'] = PerfilProveedorSerializer(user.perfil_proveedor).data
    
    return Response(response_data)


@api_view(['GET'])
def profile(request):
    """Perfil del usuario autenticado"""
    user = request.user
    
    if not user.is_authenticated:
        return Response(
            {'error': 'No autenticado'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    return Response(UserSerializer(user).data)


# ========== VIEWSETS ==========
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
        proveedor = self.request.query_params.get('proveedor', None)
        
        if categoria:
            queryset = queryset.filter(categoria__id=categoria)
        if proveedor:
            queryset = queryset.filter(creado_por__id=proveedor)
            
        return queryset
    
    @action(detail=False, methods=['get'])
    def mis_servicios(self, request):
        """Obtener servicios del proveedor autenticado"""
        if not request.user.is_authenticated:
            return Response({'error': 'No autenticado'}, status=401)
        
        servicios = Servicio.objects.filter(creado_por=request.user)
        serializer = self.get_serializer(servicios, many=True)
        return Response(serializer.data)


class VestidoNoviaViewSet(viewsets.ModelViewSet):
    queryset = VestidoNovia.objects.all()
    serializer_class = VestidoNoviaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = VestidoNovia.objects.all()
        estilo = self.request.query_params.get('estilo', None)
        precio_max = self.request.query_params.get('precio_max', None)
        proveedor = self.request.query_params.get('proveedor', None)
        
        if estilo:
            queryset = queryset.filter(estilo=estilo)
        if precio_max:
            queryset = queryset.filter(precio__lte=precio_max)
        if proveedor:
            queryset = queryset.filter(proveedor__id=proveedor)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def mis_vestidos(self, request):
        """Obtener vestidos del proveedor autenticado"""
        if not request.user.is_authenticated:
            return Response({'error': 'No autenticado'}, status=401)
        
        vestidos = VestidoNovia.objects.filter(proveedor=request.user)
        serializer = self.get_serializer(vestidos, many=True)
        return Response(serializer.data)


class TrajeNovioViewSet(viewsets.ModelViewSet):
    queryset = TrajeNovio.objects.all()
    serializer_class = TrajeNovioSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = TrajeNovio.objects.all()
        tipo = self.request.query_params.get('tipo', None)
        precio_max = self.request.query_params.get('precio_max', None)
        proveedor = self.request.query_params.get('proveedor', None)
        
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if precio_max:
            queryset = queryset.filter(precio__lte=precio_max)
        if proveedor:
            queryset = queryset.filter(proveedor__id=proveedor)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def mis_trajes(self, request):
        """Obtener trajes del proveedor autenticado"""
        if not request.user.is_authenticated:
            return Response({'error': 'No autenticado'}, status=401)
        
        trajes = TrajeNovio.objects.filter(proveedor=request.user)
        serializer = self.get_serializer(trajes, many=True)
        return Response(serializer.data)


class ComplementoNoviaViewSet(viewsets.ModelViewSet):
    queryset = ComplementoNovia.objects.all()
    serializer_class = ComplementoNoviaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = ComplementoNovia.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        proveedor = self.request.query_params.get('proveedor', None)
        
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        if proveedor:
            queryset = queryset.filter(proveedor__id=proveedor)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def mis_complementos(self, request):
        """Obtener complementos del proveedor autenticado"""
        if not request.user.is_authenticated:
            return Response({'error': 'No autenticado'}, status=401)
        
        complementos = ComplementoNovia.objects.filter(proveedor=request.user)
        serializer = self.get_serializer(complementos, many=True)
        return Response(serializer.data)


class ComplementoNovioViewSet(viewsets.ModelViewSet):
    queryset = ComplementoNovio.objects.all()
    serializer_class = ComplementoNovioSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = ComplementoNovio.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        proveedor = self.request.query_params.get('proveedor', None)
        
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        if proveedor:
            queryset = queryset.filter(proveedor__id=proveedor)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def mis_complementos(self, request):
        """Obtener complementos del proveedor autenticado"""
        if not request.user.is_authenticated:
            return Response({'error': 'No autenticado'}, status=401)
        
        complementos = ComplementoNovio.objects.filter(proveedor=request.user)
        serializer = self.get_serializer(complementos, many=True)
        return Response(serializer.data)


class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [permissions.AllowAny]


class ValoracionViewSet(viewsets.ModelViewSet):
    queryset = Valoracion.objects.all()
    serializer_class = ValoracionSerializer
    permission_classes = [permissions.AllowAny]


class TareaAgendaViewSet(viewsets.ModelViewSet):
    queryset = TareaAgenda.objects.all()
    serializer_class = TareaAgendaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = TareaAgenda.objects.all()
        usuario = self.request.query_params.get('usuario', None)
        
        if usuario:
            queryset = queryset.filter(usuario__id=usuario)
        
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