import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  menuAbierto: { [key: string]: boolean } = {
    'miboda': false,
    'novias': false,
    'novios': false,
    'usuario': false
  };

  private timeouts: { [key: string]: any } = {};

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  abrirMenu(menu: string): void {
    // Cancelar cualquier cierre pendiente
    if (this.timeouts[menu]) {
      clearTimeout(this.timeouts[menu]);
      delete this.timeouts[menu];
    }
    // Abrir el menú inmediatamente
    this.menuAbierto[menu] = true;
  }

  cerrarMenu(menu: string): void {
    // Esperar 200ms antes de cerrar para dar tiempo a mover el cursor
    this.timeouts[menu] = setTimeout(() => {
      this.menuAbierto[menu] = false;
      delete this.timeouts[menu];
    }, 200);
  }

  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}