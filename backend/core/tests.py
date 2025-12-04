from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import (
    Proveedor, CategoriaServicio, Servicio, Reserva, 
    VestidoNovia, PerfilProveedor
)

# ========== TESTS DE AUTENTICACIÓN ==========
class AuthenticationTests(APITestCase):
    def test_register_user(self):
        """Test registro de usuario normal"""
        data = {
            'username': 'testuser',
            'password': 'testpass123',
            'email': 'test@example.com'
        }
        response = self.client.post('/api/auth/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertFalse(response.data['es_proveedor'])
    
    def test_register_duplicate_user(self):
        """Test registro de usuario duplicado"""
        User.objects.create_user('testuser', password='testpass123')
        data = {'username': 'testuser', 'password': 'testpass123'}
        response = self.client.post('/api/auth/register/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_login_success(self):
        """Test login exitoso"""
        User.objects.create_user('testuser', password='testpass123')
        data = {'username': 'testuser', 'password': 'testpass123'}
        response = self.client.post('/api/auth/login/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')
    
    def test_login_invalid_credentials(self):
        """Test login con credenciales inválidas"""
        data = {'username': 'invalid', 'password': 'wrong'}
        response = self.client.post('/api/auth/login/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_register_proveedor(self):
        """Test registro de proveedor"""
        data = {
            'username': 'proveedor1',
            'password': 'testpass123',
            'email': 'proveedor@example.com',
            'nombre_empresa': 'Mi Empresa',
            'descripcion': 'Servicios de boda',
            'telefono': '612345678',
            'ciudad': 'Madrid'
        }
        response = self.client.post('/api/auth/register-proveedor/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['es_proveedor'])


# ========== TESTS DE MODELOS ==========
class ModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('testuser', password='test123')
        self.proveedor = Proveedor.objects.create(
            nombre='Test Proveedor',
            descripcion='Descripción test',
            telefono='612345678',
            email='proveedor@test.com',
            direccion='Calle Test 1',
            ciudad='Madrid'
        )
        self.categoria = CategoriaServicio.objects.create(
            nombre='DJ y Música',
            descripcion='Servicios musicales'
        )
    
    def test_create_servicio(self):
        """Test creación de servicio"""
        servicio = Servicio.objects.create(
            proveedor=self.proveedor,
            categoria=self.categoria,
            nombre='DJ Profesional',
            descripcion='DJ para bodas',
            precio=500.00
        )
        self.assertEqual(servicio.nombre, 'DJ Profesional')
        self.assertTrue(servicio.disponible)
    
    def test_create_vestido_novia(self):
        """Test creación de vestido de novia"""
        vestido = VestidoNovia.objects.create(
            nombre='Vestido Princesa',
            marca='Rosa Clará',
            precio=2500.00,
            descripcion='Vestido elegante',
            descripcion_larga='Descripción larga',
            estilo='princesa',
            color='Blanco',
            tallas_disponibles='36,38,40',
            imagen_principal='https://example.com/img.jpg',
            proveedor=self.user
        )
        self.assertEqual(vestido.nombre, 'Vestido Princesa')
        self.assertEqual(vestido.estilo, 'princesa')
    
    def test_create_reserva(self):
        """Test creación de reserva"""
        servicio = Servicio.objects.create(
            proveedor=self.proveedor,
            categoria=self.categoria,
            nombre='Test Servicio',
            descripcion='Descripción',
            precio=100.00
        )
        reserva = Reserva.objects.create(
            usuario=self.user,
            servicio=servicio,
            fecha_evento='2025-12-31',
            estado='pendiente'
        )
        self.assertEqual(reserva.estado, 'pendiente')
        self.assertEqual(reserva.get_producto_nombre(), 'Test Servicio')


# ========== TESTS DE API ==========
class APITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('testuser', password='test123')
        self.proveedor = Proveedor.objects.create(
            nombre='Test Proveedor',
            descripcion='Test',
            telefono='612345678',
            email='test@test.com',
            direccion='Calle Test',
            ciudad='Madrid'
        )
        self.categoria = CategoriaServicio.objects.create(nombre='Test')
    
    def test_list_servicios(self):
        """Test listar servicios"""
        Servicio.objects.create(
            proveedor=self.proveedor,
            categoria=self.categoria,
            nombre='Servicio 1',
            descripcion='Test',
            precio=100
        )
        response = self.client.get('/api/servicios/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_list_categorias(self):
        """Test listar categorías"""
        response = self.client.get('/api/categorias/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_reserva(self):
        """Test crear reserva"""
        servicio = Servicio.objects.create(
            proveedor=self.proveedor,
            categoria=self.categoria,
            nombre='Test',
            descripcion='Test',
            precio=100
        )
        data = {
            'usuario': self.user.id,
            'servicio': servicio.id,
            'fecha_evento': '2025-12-31',
            'estado': 'pendiente'
        }
        response = self.client.post('/api/reservas/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verificar que el servicio se marca como no disponible
        servicio.refresh_from_db()
        self.assertFalse(servicio.disponible)
    
    def test_cancel_reserva_marks_available(self):
        """Test que cancelar reserva marca producto disponible"""
        servicio = Servicio.objects.create(
            proveedor=self.proveedor,
            categoria=self.categoria,
            nombre='Test',
            descripcion='Test',
            precio=100,
            disponible=False
        )
        reserva = Reserva.objects.create(
            usuario=self.user,
            servicio=servicio,
            fecha_evento='2025-12-31',
            estado='pendiente'
        )
        
        # Cancelar reserva
        response = self.client.patch(
            f'/api/reservas/{reserva.id}/',
            {'estado': 'cancelada'}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verificar disponibilidad
        servicio.refresh_from_db()
        self.assertTrue(servicio.disponible)


# ========== TESTS DE VALIDACIÓN ==========
class ValidationTests(APITestCase):
    def test_reserva_without_producto(self):
        """Test que no se puede crear reserva sin producto"""
        user = User.objects.create_user('test', password='test')
        data = {
            'usuario': user.id,
            'fecha_evento': '2025-12-31',
            'estado': 'pendiente'
        }
        response = self.client.post('/api/reservas/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_without_password(self):
        """Test registro sin contraseña"""
        data = {'username': 'test'}
        response = self.client.post('/api/auth/register/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)