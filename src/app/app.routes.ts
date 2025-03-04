import { Routes } from '@angular/router';
import { DashboardComponent } from './movies/dashboard/dashboard.component';

export const routeNames = {
  dashboard: 'Dashboard',
  movies: 'Movies',
  favorites: 'Favorites',
  categories: 'Categories',
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix',
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'movies',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./movies/movies.component').then(
            (mod) => mod.MoviesComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./movies/movie/movie.component').then(
            (mod) => mod.MovieComponent
          ),
      },
    ],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(
        (mod) => mod.FavoritesComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (mod) => mod.CategoriesComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];
