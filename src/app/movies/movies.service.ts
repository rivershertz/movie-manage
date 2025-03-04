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
  private BASE_URL = 'http://localHost:3000';
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  favorites = this._favorites.asReadonly();

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

  getFavorites() {
    return this.getMovies<{ favorites: Movie[] }>(
      '/favorites',
      'failed to fetch favorite movies'
    ).pipe(
      map((res) => res.favorites),
      tap((favorites) => {
        this._favorites.set(favorites);
      })
    );
  }

  getMovieById(id: string) {
    return this.getMovies<{ movie: Movie }>(
      '/movies/' + id,
      'failed to fetch movie'
    ).pipe(map((res) => res.movie));
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
            this.errorService.error.set('failed to add movie to favorites');
          },
          next: (favorites) => this._favorites.set(favorites),
        })
      );
  }
}
