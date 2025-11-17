from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProveedorViewSet,
    CategoriaServicioViewSet,
    ServicioViewSet,
    ReservaViewSet,
    ValoracionViewSet
)

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet)
router.register(r'categorias', CategoriaServicioViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'reservas', ReservaViewSet)
router.register(r'valoraciones', ValoracionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]