import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterConfig } from '../../models/filter-config.model';
import { config } from 'rxjs';
import { UserFilter } from '../../models/user-filter.model';
import { BaseFilter } from '../../models/base-filter.model';

@Component({
  selector: 'app-filters',
  standalone: false,
  
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  @Input() public filterConfigs: FilterConfig[] = [];
  @Output() public filterChange = new EventEmitter<BaseFilter>();
  @Output() public search = new EventEmitter<BaseFilter>();


  public filters: BaseFilter = {};

  constructor() { }

  
  public ngOnInit() {
    this.filterConfigs.forEach(config => {
      if (config.defaultValue) {
        this.filters[config.property] = config.defaultValue;
      } else {
        this.filters[config.property] = config.type === 'checkbox' ? false : '';
      }
    });
    this.emitFilters();
  }

  public onValueChange() : void {
    this.emitFilters();
  }

  public onSearch(): void {
    this.search.emit(this.filters);
  }


  private emitFilters() {
    this.filterChange.emit(this.filters);
  }

}
