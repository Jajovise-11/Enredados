// Enredados/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Recuperar usuario del localStorage al iniciar
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Obtener el valor actual del usuario
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // ========== REGISTRO ==========
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, userData);
  }

  // Registro de proveedor
  registerProveedor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register-proveedor/`, data)
      .pipe(
        map(user => {
          // Guardar usuario en localStorage
          if (user && (user as any).id) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // ========== LOGIN ==========
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login/`, { username, password })
      .pipe(
        map(user => {
          // Guardar usuario en localStorage
          if (user && user.id) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // ========== LOGOUT ==========
  logout(): void {
    // Eliminar usuario del localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // ========== VERIFICACIONES ==========
  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  // CORREGIDO: Verificación más estricta de si es proveedor
  isProveedor(): boolean {
    const user = this.currentUserValue;
    if (!user) {
      return false;
    }
    
    // Verificar que es_proveedor sea explícitamente true
    // Y que tenga un perfil_proveedor válido (no null, no undefined)
    const tieneFlag = user.es_proveedor === true;
    const tienePerfil = user.perfil_proveedor && 
                        typeof user.perfil_proveedor === 'object' && 
                        Object.keys(user.perfil_proveedor).length > 0;
    
    return tieneFlag && tienePerfil;
  }

  getUserId(): number | null {
    const user = this.currentUserValue;
    return user ? user.id : null;
  }

  getUsername(): string {
    const user = this.currentUserValue;
    return user ? user.username : '';
  }

  getUserEmail(): string {
    const user = this.currentUserValue;
    return user ? user.email : '';
  }

  getPerfilProveedor(): any {
    const user = this.currentUserValue;
    return user?.perfil_proveedor || null;
  }

  getProveedorId(): number | null {
    const user = this.currentUserValue;
    return user?.proveedor_id || null;
  }

  // NUEVO: Método de depuración para verificar el estado del usuario
  debugUserStatus(): void {
    const user = this.currentUserValue;
    console.log('=== DEBUG USER STATUS ===');
    console.log('Usuario:', user);
    console.log('es_proveedor:', user?.es_proveedor);
    console.log('perfil_proveedor:', user?.perfil_proveedor);
    console.log('isProveedor():', this.isProveedor());
    console.log('========================');
  }
}