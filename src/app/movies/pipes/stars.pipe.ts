import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
})
export class StarsPipe implements PipeTransform {
  transform(rating?: number): undefined | string {
    if (rating === undefined) return;
    if (rating === 0) return '☆'.repeat(5);

    const starCount = Math.round(rating / 2);

    return [
      ...Array(starCount).fill('★'),
      ...Array(5 - starCount).fill('☆'),
    ].join('');
  }
}
