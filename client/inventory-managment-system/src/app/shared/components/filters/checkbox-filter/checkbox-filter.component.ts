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
  @Input() public value: boolean | undefined;
  @Output() public valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onValueChange(): void {
    this.valueChange.emit(this.value);
  }
}
