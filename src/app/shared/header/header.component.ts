// header.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routeNames } from '../../app.routes';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isDarkMode = true;
  router = inject(Router);
  routeNames = routeNames;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.className = this.isDarkMode ? 'dark' : 'light';
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
