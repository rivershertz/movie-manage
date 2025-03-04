import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { MovieGridComponent } from '../movies/movie-grid/movie-grid.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [MovieGridComponent, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  moviesService = inject(MoviesService);
  favorites = this.moviesService.favorites;

  ngOnInit(): void {
    this.moviesService.getFavorites().subscribe();
  }
}
