import { effect, inject, Injectable, signal } from '@angular/core';
import { Movie, Order } from './movies.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private BASE_URL = 'http://localHost:3000';
  private _favorites = signal<Movie[]>([]);
  private _movies = signal<Movie[]>([]);
  private _filteredMovies = signal<Movie[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  order = signal<Order | undefined>(undefined);
  favorites = this._favorites.asReadonly();
  filteredMovies = this._filteredMovies.asReadonly();

  constructor() {
    effect(() => {
      this.sortMovies(this.order());
    });
  }

  init() {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      this.order.set(storedOrder as Order);
    }
  }

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

  sortMovies(order: Order | undefined) {
    if (!order) {
      return;
    }
    this._filteredMovies.update((prevMovies) => {
      const copy = [...prevMovies];
      copy.sort((a, b) => {
        const titleA = a.original_title;
        const titleB = b.original_title;
        if (order === 'asc') {
          return titleA < titleB ? -1 : 1;
        }
        return titleB < titleA ? -1 : 1;
      });
      return copy;
    });
  }

  toggleOrder() {
    this.order.update((prev) => {
      const updated = prev === 'asc' ? 'desc' : 'asc';
      localStorage.setItem('order', updated);
      return updated;
    });
  }
}
