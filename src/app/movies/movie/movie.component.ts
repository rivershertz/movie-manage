import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movies.model';
import { MoviesService } from '../movies.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { StarsPipe } from '../stars.pipe';

@Component({
  selector: 'app-movie',
  imports: [DatePipe, StarsPipe, UpperCasePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  movie = signal<Movie>({} as Movie);
  moviesService = inject(MoviesService);
  isInFavorites = computed(() => {
    return this.moviesService.favorites().some((m) => m.id === this.movie().id);
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService
        .getMovieById(params['id'])
        .subscribe((movie) => this.movie.set(movie));
    });
  }

  onAddToFavorites() {
    this.moviesService.addToFavorites(this.movie().id).subscribe();
  }
}
