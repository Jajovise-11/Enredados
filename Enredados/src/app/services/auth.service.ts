import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Cargar usuario desde localStorage si existe
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password })
      .pipe(
        tap(user => {
          // Guardar usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, userData);
  }

  logout(): void {
    // Eliminar usuario de localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getUserId(): number | null {
    return this.currentUserValue ? this.currentUserValue.id : null;
  }

  getUsername(): string | null {
    return this.currentUserValue ? this.currentUserValue.username : null;
  }
  
  crearReserva(reservaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas/`, reservaData);
  }

  getReservasUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas/?usuario=${usuarioId}`);
  }

  cancelarReserva(reservaId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reservas/${reservaId}/`, { estado: 'cancelada' });
  }
}