import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: { class: 'highlighted' },
})
export class HighlightDirective {}
