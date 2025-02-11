import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterConfig } from '../../../models/filter-config.model';

@Component({
  selector: 'app-text-filter',
  standalone: false,
  
  templateUrl: './text-filter.component.html',
  styleUrl: './text-filter.component.css'
})
export class TextFilterComponent {
  @Input() public config!: FilterConfig;
  @Input() public value!: string;
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public onValueChange(): void {
    this.valueChange.emit(this.value);
  }

}
