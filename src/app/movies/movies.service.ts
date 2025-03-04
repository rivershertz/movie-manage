import { inject, Injectable, signal } from '@angular/core';
import { Movie } from './movies.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _favorites = signal<Movie[]>([]);
  private BASE_URL = 'http://localHost:3000';
  favorites = this._favorites.asReadonly();
  httpClient = inject(HttpClient);
  errorService = inject(ErrorService);

  getMovies(route: string, errorMessage: string, limit?: number) {
    return this.httpClient
      .get<{ movies: Movie[] }>(`${this.BASE_URL}${route}`, {
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
}
