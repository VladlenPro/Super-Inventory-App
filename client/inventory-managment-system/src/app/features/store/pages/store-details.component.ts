import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../core/services/store.service';
import { ToastService } from '../../../core/services/toast.service';
import { StoreResponse } from '../../../shared/models/Responses/store-response.model';
import { StoreRequest } from '../../../shared/models/Requests/store-request.model';

@Component({
  selector: 'app-store-details',
  standalone: false,
  
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {
  public storeForm: FormGroup;
  public isEditMode: boolean = false;

  private storeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private toastrService: ToastService
  ) {
    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      branchName: ['', Validators.required],
      address: ['', [Validators.required]],
      isActive: [true]
    });
  }
  public ngOnInit(): void {
    this.storeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.storeId;

    if (this.isEditMode) {
      this.loadStore(this.storeId!);
    }
  }

  public onSubmit(): void {
    if (this.storeForm.valid) {
      this.toastrService.showInfo("make sure to save the store");
      const storeRequest: StoreRequest = this.mapToStoreRequest();
      this.upsert(storeRequest);
    } else {
      Object.values(this.storeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  public goBack(): void {
    this.router.navigate(['/stores']);
  }

  private loadStore(storeId: string): void {
    this.storeService.getStoreById(storeId).subscribe({
      next:(store: StoreResponse) => {
        this.storeForm.patchValue(store.data);
        this.toastrService.showSuccess(store.message);
      },
      error:(err: Error) => 
        console.error('Error loading store', err)
    });
  }

  private upsert(storeRequest: StoreRequest): void {
    this.storeService.upsertStore(storeRequest).subscribe({
      next: (response: StoreResponse) => {
        this.toastrService.showSuccess(response.message);
        this.router.navigate(['/stores/details', response.data.id]);
      },
      error: (err: Error) => {
        console.error('Error upserting store', err);
      },
      complete: () => {
        console.log('Upserting store complete');
      }
    });
  }

  private mapToStoreRequest(): StoreRequest {
    const formValues: any = this.storeForm.getRawValue();

    return {
      id: this.isEditMode ? this.storeId ?? this.storeId ?? undefined : undefined,
      name: formValues.name,
      branchName: formValues.branchName,
      address: formValues.address,
      isActive: formValues.isActive,
      products: []
    };
  }


}
