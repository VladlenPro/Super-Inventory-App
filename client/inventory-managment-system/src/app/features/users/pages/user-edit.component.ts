import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRequest } from '../../../shared/models/Requests/user-request.model';
import { UserService } from '../../../core/services/user.service';
import { UserResponse } from '../../../shared/models/Responses/user-response.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userForm: FormGroup;
  public isEditMode: boolean = false;

  private userId: string | null = null;
  


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userTypes: [[]],
      stores: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['',  [Validators.required]],
      isActive: [true]
    });
  }

  public ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.loadUser(this.userId!);
    }
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      const userRequest: UserRequest = this.mapToUserRequest();
      this.upsert(userRequest);
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public goBack(): void {
    this.router.navigate(['/users']);
  }

  private mapToUserRequest(): UserRequest {
    const formValues = this.userForm.getRawValue();
    let stores: string[] = [];
    
    if(formValues.stores) {
      stores = formValues.stores.split(',').map((s:string) => s.trim());
    }
  
    return {
      id: this.isEditMode ? this.userId ?? this.userId ?? undefined : undefined,
      username: formValues.username,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
      userTypes: formValues.userTypes,
      stores: stores,
      phone: formValues.phone,
      address: formValues.address,
      isActive: formValues.isActive
    };
  }

  private upsert(userRequest: UserRequest): void {
    this.userService.upsertUser(userRequest).subscribe({
      next: (response: UserResponse) => {
        console.log('User saved successfully!', response);
        this.toastrService.showSuccess(response.message);
        this.router.navigate(['/users/edit', response.data.id]);
      },
      error: (err: Error) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Upsert operation completed.');
      }
    })
  }

  private loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user: UserResponse) => {
        this.userForm.patchValue(user.data)
        this.toastrService.showSuccess(user.message);
      },
      error: (err: Error) => 
        console.error('Error loading user:', err)
    });
  }
}
