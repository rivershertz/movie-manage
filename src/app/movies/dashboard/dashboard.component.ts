import { Component, inject, OnInit, signal } from '@angular/core';

import { map } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { CardGridComponent } from '../../shared/card-grid/card-grid.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviesService } from '../movies.service';
import { Movie } from '../movies.model';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, CardGridComponent, MovieCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  moviesService = inject(MoviesService);
  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.moviesService
      .getMovies('/movies', 'failed to fetch movies', 5)
      .pipe(map((res) => res.movies))
      .subscribe((movies) => {
        this.movies.set(movies);
      });
  }
}
