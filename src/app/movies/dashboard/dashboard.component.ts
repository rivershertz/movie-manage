import { Component, inject, OnInit, signal } from '@angular/core';

import { map } from 'rxjs';
import { MoviesService } from '../movies.service';
import { Movie } from '../movies.model';
import { MovieGridComponent } from '../movie-grid/movie-grid.component';

@Component({
  selector: 'app-dashboard',
  imports: [MovieGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  moviesService = inject(MoviesService);
  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.moviesService
      .getMovies<{ movies: Movie[] }>('/movies', 'failed to fetch movies', 5)
      .pipe(map((res) => res.movies))
      .subscribe((movies) => {
        this.movies.set(movies);
      });
  }
}
