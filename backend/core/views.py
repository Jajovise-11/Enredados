from rest_framework import viewsets, permissions
from .models import Proveedor, CategoriaServicio, Servicio, Reserva, Valoracion
from .serializers import (
    ProveedorSerializer, 
    CategoriaServicioSerializer, 
    ServicioSerializer, 
    ReservaSerializer, 
    ValoracionSerializer
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