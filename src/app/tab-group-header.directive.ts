import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabGroupHeader]',
  standalone: true,
})
export class TabGroupHeaderDirective<T> {
  constructor(public template: TemplateRef<T>) { }
}