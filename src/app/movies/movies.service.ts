import { inject, Injectable, signal } from '@angular/core';
import { Movie } from './movies.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _favorites = signal<Movie[]>([]);
  private _movies = signal<Movie[]>([]);
  private BASE_URL = 'http://localHost:3000';
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  private _filteredMovies = signal<Movie[]>([]);

  favorites = this._favorites.asReadonly();
  filteredMovies = this._filteredMovies.asReadonly();

  getMovies<T>(route: string, errorMessage: string, limit?: number) {
    return this.httpClient
      .get<T>(`${this.BASE_URL}${route}`, {
        params: { ...(limit && { limit }) },
      })
      .pipe(
        tap({
          error: () => {
            this.errorService.error.set(errorMessage);
          },
        })
      );
  }

  getMostViewedMovies() {
    return this.getMovies<{ movies: Movie[] }>(
      '/movies',
      'failed to fetch movies',
      5
    ).pipe(map((res) => res.movies));
  }

  getAllMovies() {
    return this.getMovies<{ movies: Movie[] }>(
      '/movies',
      'failed to fetch all movies'
    ).pipe(
      map((res) => res.movies),
      tap({
        next: (movies) => {
          if (this._movies().length === 0) {
            this._movies.set(movies);
            this._filteredMovies.set(movies);
          }
        },
        error: () => {
          this.errorService.error.set('failed to fetch all movies');
        },
      })
    );
  }

  getFavorites() {
    return this.getMovies<{ favorites: Movie[] }>(
      '/favorites',
      'failed to fetch favorite movies'
    ).pipe(
      map((res) => res.favorites),
      tap({
        next: (favorites) => {
          this._favorites.set(favorites);
        },
        error: () => {
          this.errorService.error.set('failed to fetch favorites');
        },
      })
    );
  }

  getMovieById(id: string) {
    return this.getMovies<{ movie: Movie }>(
      '/movies/' + id,
      'failed to fetch movie'
    ).pipe(
      map((res) => res.movie),
      tap({
        error: () => {
          this.errorService.error.set('failed to fetch movie');
        },
      })
    );
  }

  addToFavorites(id: string) {
    return this.httpClient
      .put<{ favorites: Movie[] }>(`${this.BASE_URL}/favorites`, {
        movieId: id,
      })
      .pipe(
        map((res) => res.favorites),
        tap({
          error: () => {
            this.errorService.error.set('failed to add movie to favorites');
          },
          next: (favorites) => this._favorites.set(favorites),
        })
      );
  }

  removeFromFavorites(id: string) {
    return this.httpClient
      .delete<{ favorites: Movie[] }>(`${this.BASE_URL}/favorites/${id}`)
      .pipe(
        map((res) => res.favorites),
        tap({
          error: () => {
            this.errorService.error.set(
              'failed to remove movie from favorites'
            );
          },
          next: (favorites) => this._favorites.set(favorites),
        })
      );
  }

  filterMovies(query: string) {
    if (!query) {
      this._filteredMovies.set(this._movies());
    }
    const filtered = this._movies().filter((m) =>
      m.original_title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    this._filteredMovies.set(filtered);
  }
}
