import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabGroupContent]',
  standalone: true,
})
export class TabGroupContentDirective<T> {
  constructor(public template: TemplateRef<T>) {
  }
}