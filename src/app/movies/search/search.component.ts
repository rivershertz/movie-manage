import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  moviesService = inject(MoviesService);
  order = this.moviesService.order;
  isSaved = signal(!!localStorage.getItem('searchQuery'));

  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor() {
    effect(() => {
      if (this.moviesService.searchQuery()) {
        this.form.controls.search.setValue(
          this.moviesService.searchQuery()!.query
        );
      }
    });
  }

  onSubmit() {
    if (this.form.value.search === '' || this.form.value.search) {
      this.moviesService.filterMovies(this.form.value.search);
    }
  }

  onSort() {
    this.moviesService.toggleOrder();
  }

  onSaveFilter() {
    this.moviesService.saveSearchQuery(this.form.value.search || '');
    this.isSaved.set(true);
  }

  onRemoveFilter() {
    localStorage.removeItem('searchQuery');
    this.isSaved.set(false);
  }
}
