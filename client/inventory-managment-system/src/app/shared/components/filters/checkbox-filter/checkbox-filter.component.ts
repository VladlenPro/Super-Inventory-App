import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FilterConfig } from '../../../models/filter-config.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-filter',
  standalone: false,
  
  templateUrl: './checkbox-filter.component.html',
  styleUrl: './checkbox-filter.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxFilterComponent),
      multi: true
    }
  ]
})
export class CheckboxFilterComponent {
  @Input() public config!: FilterConfig;
  @Input() public value: boolean | null = null;
  @Output() public valueChange: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

  public onValueChange(): void {
    if (this.value === false) {
      this.value = null;
    }
    this.valueChange.emit(this.value);
  }
}
