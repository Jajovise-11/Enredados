from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProveedorViewSet, CategoriaServicioViewSet, ServicioViewSet,
    ReservaViewSet, ValoracionViewSet,
    VestidoNoviaViewSet, TrajeNovioViewSet,
    ComplementoNoviaViewSet, ComplementoNovioViewSet,
    TareaAgendaViewSet, ItemPresupuestoViewSet,
    register, login, profile
)

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet)
router.register(r'categorias', CategoriaServicioViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'reservas', ReservaViewSet)
router.register(r'valoraciones', ValoracionViewSet)

# Nuevas rutas para productos
router.register(r'vestidos-novia', VestidoNoviaViewSet)
router.register(r'trajes-novio', TrajeNovioViewSet)
router.register(r'complementos-novia', ComplementoNoviaViewSet)
router.register(r'complementos-novio', ComplementoNovioViewSet)

# Rutas para agenda y presupuesto
router.register(r'tareas-agenda', TareaAgendaViewSet)
router.register(r'presupuesto', ItemPresupuestoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('auth/profile/', profile, name='profile'),
]