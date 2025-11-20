import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Enredados';
  servicios: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios);
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }
}