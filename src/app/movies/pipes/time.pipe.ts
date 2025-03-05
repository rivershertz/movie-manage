import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(duration: number): string {
    return formatMinutesToTime(duration);
  }
}

function formatMinutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const formattedMinutes = mins.toString().padStart(2, '0');
  return `${hours}:${formattedMinutes}`;
}
