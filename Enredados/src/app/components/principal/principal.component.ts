import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}

