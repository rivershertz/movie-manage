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
  const totalMinutes = Math.max(0, Math.floor(Number(minutes)));
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const formattedMinutes = mins.toString().padStart(2, '0');
  return `${hours}:${formattedMinutes}`;
}
