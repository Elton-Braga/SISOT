import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  menuAberto = false;
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
