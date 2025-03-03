import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { CardGridComponent } from '../shared/card-grid/card-grid.component';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, CardGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
