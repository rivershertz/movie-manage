import { Component, input } from '@angular/core';
import { CardData } from './card.model';
import { StarsPipe } from '../../movies/pipes/stars.pipe';
import { HighlightDirective } from '../../movies/highlight.directive';

@Component({
  selector: 'app-card',
  imports: [StarsPipe, HighlightDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  data = input.required<CardData>();

  getImageUrl() {
    return `url(${this.data().imageUrl})`;
  }
}
