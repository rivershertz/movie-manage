import { Component, input } from '@angular/core';
import { CardData } from './card.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  data = input.required<CardData>();

  getImageUrl() {
    return `url(${this.data().imageUrl})`;
  }
}
