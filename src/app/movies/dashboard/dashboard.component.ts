import { Component, inject, OnInit, signal } from '@angular/core';

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
    this.moviesService.getMostViewedMovies().subscribe((movies) => {
      this.movies.set(movies);
    });
  }
}
