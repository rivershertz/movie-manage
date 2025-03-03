import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie/movie.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CategoriesComponent } from './categories/categories.component';

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
    component: MoviesComponent,
    children: [{ path: ':id', component: MovieComponent }],
  },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'categories', component: CategoriesComponent },
];
