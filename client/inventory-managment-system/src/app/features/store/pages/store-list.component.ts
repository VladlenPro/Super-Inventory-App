import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../../shared/models/store.model';
import { StoreService } from '../../../core/services/store.service';
import { ToastService } from '../../../core/services/toast.service';
import { FilterConfig } from '../../../shared/models/filter-config.model';
import { BaseFilter } from '../../../shared/models/base-filter.model';
import { StoreFilter } from '../../../shared/models/store-filter.model';

@Component({
  selector: 'app-store-list',
  standalone: false,
  
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.css'
})
export class StoreListComponent implements OnInit {
  public stores: Store[] = [];
  public searchText: string = '';
  public myFilters: FilterConfig[] = [
    {
      type: 'text',
      label: 'Search',
      property: 'searchText',
      placeholder: 'Search...'
    },
    {
      type: 'checkbox',
      label: 'Show Active Only',
      property: 'isActive',
      defaultValue: false
    }
  ];

  public filters: StoreFilter = {
    searchText: '',
    isActive: null
  };

  constructor(
    private router: Router,
    private storeService: StoreService,
    private toastservice: ToastService
  ) {}

  public ngOnInit(): void {
    this.loadStores();
  }
  
  public addNewStore(): void {
    this.router.navigate(['/stores/add']);
  }

  public editStore(storeId: string): void {
    this.router.navigate(['/stores/details', storeId]);
  }

  public toggleStatus(store: Store): void {
    const previousStatus: boolean = store.isActive;
    store.isActive = !store.isActive;
    this.storeService.toggleStoreStatus(store.id, store.isActive).subscribe({
      next: () => this.toastservice.showSuccess('Store status updated successfully'),
      error: () => store.isActive = previousStatus,
      complete: () => this.loadStores()
    });
  }

  public handleFilterChange(newfilters: BaseFilter): void {
    if((newfilters as StoreFilter).isActive === false) {
      (newfilters as StoreFilter).isActive = null;
    }
    this.filters = newfilters as StoreFilter;
  }

  public onSearch(filters: BaseFilter): void {
    const storeFilters: StoreFilter = filters as StoreFilter;
    this.storeService.filterStores(storeFilters).subscribe({
      next: (stores: Store[]) => this.stores = stores,
      error: (error: Error) => this.toastservice.showError('Failed to filter stores')
    });
  }

  private loadStores(): void {
    this.storeService.getAllStores().subscribe({
      next: (stores: Store[]) => this.stores = stores,
      error: () => this.toastservice.showError('Failed to load stores')
    });
  }

}
