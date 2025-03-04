import { inject, Injectable, signal } from '@angular/core';
import { Movie } from './movies.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _favorites = signal<Movie[]>([]);
  private BASE_URL = 'http://localHost:3000';
  favorites = this._favorites.asReadonly();
  httpClient = inject(HttpClient);

  getMovies(route: string, errorMessage: string, limit?: number) {
    return this.httpClient.get<Movie[]>(`${this.BASE_URL}${route}`, {
      params: { ...(limit && { limit }) },
    });
  }
}
