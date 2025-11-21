import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/`);
  }

  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores/`);
  }

  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/`);
  }

  getServicio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/${id}/`);
  }

  getValoraciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoraciones/`);
  }

  crearReserva(reservaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas/`, reservaData);
  }

  crearValoracion(valoracionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/valoraciones/`, valoracionData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/`, credentials);
  }
}