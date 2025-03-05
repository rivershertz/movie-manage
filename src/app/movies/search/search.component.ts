import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  moviesService = inject(MoviesService);
  order = signal<'asc' | 'desc'>('asc');

  form = new FormGroup({
    search: new FormControl(''),
  });

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(({ search }) => {});
  }

  onSubmit() {
    if (this.form.value.search === '' || this.form.value.search) {
      this.moviesService.filterMovies(this.form.value.search);
    }
  }

  onSort() {
    this.order.update((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    this.moviesService.sortMovies(this.order());
  }
}
