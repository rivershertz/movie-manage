import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './movies.service';
import { MovieGridComponent } from './movie-grid/movie-grid.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-movies',
  imports: [RouterOutlet, MovieGridComponent, SearchComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  moviesService = inject(MoviesService);
  movies = this.moviesService.filteredMovies;

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(() => {
      this.moviesService.init();
    });
  }
}
