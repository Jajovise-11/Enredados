import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  menuAbierto: { [key: string]: boolean } = {};

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  toggleMenu(menu: string): void {
    this.menuAbierto[menu] = !this.menuAbierto[menu];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}