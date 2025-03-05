import { Component, inject } from '@angular/core';
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

  form = new FormGroup({
    search: new FormControl(''),
  });

  onSubmit() {
    if (this.form.value.search === '' || this.form.value.search) {
      this.moviesService.filterMovies(this.form.value.search);
    }
  }

  onSort() {
    this.moviesService.toggleOrder();
  }
}
