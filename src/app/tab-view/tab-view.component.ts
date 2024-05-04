import { Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TabGroupContentDirective } from 'app/tab-group-content.directive';
import { TabGroupHeaderDirective } from 'app/tab-group-header.directive'; 
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.css',
  imports: [TabGroupContentDirective, TabGroupHeaderDirective, NgTemplateOutlet, NgIf, NgForOf, NgClass], 
  standalone: true,
})
export class TabViewComponent<T> implements OnChanges {
  @Input({ required: true }) elements: T[];
  @Output() removedElement = new EventEmitter<T>();
  selectedIndex = 0;

  @ContentChild(TabGroupHeaderDirective) header: TabGroupHeaderDirective<T>;
  @ContentChild(TabGroupContentDirective) content: TabGroupHeaderDirective<T>;

  ngOnChanges(changes: SimpleChanges) {
    if(changes!== undefined) {
      if (changes['elements']) {
        this.selectedIndex = 0;
      }
    }
  }

  selectItem(index: number) {
    this.selectedIndex = index;
  }

  removeElement(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.removedElement.emit(this.elements[index]);
    if (index === this.selectedIndex) {
      this.selectedIndex = 0;
    }
  }
}
