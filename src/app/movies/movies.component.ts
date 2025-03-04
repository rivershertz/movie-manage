import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './movies.service';
import { Movie } from './movies.model';
import { map } from 'rxjs';
import { CardGridComponent } from '../shared/card-grid/card-grid.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-movies',
  imports: [RouterOutlet, CardGridComponent, MovieCardComponent, CardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  moviesService = inject(MoviesService);
  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.moviesService
      .getMovies('/movies', 'failed to fetch movies')
      .pipe(map((res) => res.movies))
      .subscribe((movies) => {
        this.movies.set(movies);
      });
  }
}
