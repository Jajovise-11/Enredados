import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  users = [
    { name: 'Carmen', text: 'BLABLABLA...', avatar: 'https://i.pravatar.cc/40?img=1' },
    { name: 'Jose', text: 'BLBLBLBLBLA...', avatar: 'https://i.pravatar.cc/40?img=2' },
    { name: 'Mónica', text: 'blablablabla...', avatar: 'https://i.pravatar.cc/40?img=3' },
    { name: 'Adrián', text: 'BLBLABLABL', avatar: 'https://i.pravatar.cc/40?img=4' },
    { name: 'Paula', text: 'BALABLLBLABLA', avatar: 'https://i.pravatar.cc/40?img=5' },
    { name: 'María', text: 'BLABLABLABLABL', avatar: 'https://i.pravatar.cc/40?img=6' }
  ];
  bodas = [
    {
      pareja: 'Adriana & Sergio',
      imagenPrincipal: 'https://via.placeholder.com/300x200?text=Adriana+Sergio',
      miniaturas: [
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40'
      ],
      fotos: 97,
      lugar: 'Oviedo, Asturias'
    },
    {
      pareja: 'Carla & Juan',
      imagenPrincipal: 'https://via.placeholder.com/300x200?text=Carla+Juan',
      miniaturas: [
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40'
      ],
      fotos: 90,
      lugar: 'Malleza, Asturias'
    },
    {
      pareja: 'Sara & Adrián',
      imagenPrincipal: 'https://via.placeholder.com/300x200?text=Sara+Adrian',
      miniaturas: [
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40'
      ],
      fotos: 68,
      lugar: 'Gijón, Asturias'
    },
    {
      pareja: 'Sofía & Santi',
      imagenPrincipal: 'https://via.placeholder.com/300x200?text=Sofia+Santi',
      miniaturas: [
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40',
        'https://via.placeholder.com/60x40'
      ],
      fotos: 48,
      lugar: 'Onon (Cangas De Narcea), Asturias'
    }
  ];
  ideas = [
    { titulo: 'Antes de la boda', imagen: 'https://via.placeholder.com/100?text=Antes' },
    { titulo: 'La ceremonia de la boda', imagen: 'https://via.placeholder.com/100?text=Ceremonia' },
    { titulo: 'El banquete', imagen: 'https://via.placeholder.com/100?text=Banquete' },
    { titulo: 'Los servicios para tu boda', imagen: 'https://via.placeholder.com/100?text=Servicios' },
    { titulo: 'Moda nupcial', imagen: 'https://via.placeholder.com/100?text=Moda' },
    { titulo: 'Belleza y salud', imagen: 'https://via.placeholder.com/100?text=Belleza' }
  ];

  currentSlide = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 4000);
}
}
}


