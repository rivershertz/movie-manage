import { Component, input } from '@angular/core';
import { Movie } from '../movies.model';
import { CardGridComponent } from '../../shared/card-grid/card-grid.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-movie-grid',
  imports: [CardGridComponent, MovieCardComponent, CardComponent],
  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.css',
})
export class MovieGridComponent {
  list = input.required<Movie[]>();
}
