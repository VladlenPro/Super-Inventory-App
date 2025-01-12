import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { UserRequest } from '../../../shared/models/Requests/user-request.model';
import { UserService } from '../../../core/services/user.service';
import { UserResponse } from '../../../shared/models/Responses/user-response.model';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;
  isEditMode = false;
  private isLoading = false;
  private errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
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
  
    return {
      id: this.isEditMode ? this.userId ?? this.userId ?? undefined : undefined,
      username: formValues.username,
      password: formValues.password,
      userTypes: formValues.userTypes,
      stores: formValues.stores ? formValues.stores.split(',') : [],
      phone: formValues.phone,
      address: formValues.address,
      isActive: formValues.isActive
    };
  }

  private upsert(userRequest: UserRequest): void {
    this.userService.upsertUser(userRequest).subscribe({
      next: (response: UserResponse) => {
        console.log('User saved successfully!', response);
        this.router.navigate(['/users/edit', response.data.id]);
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.errorMessage = 'An error occurred while saving the user.';
      },
      complete: () => {
        this.isLoading = false;
        console.log('Upsert operation completed.');
      }
    })
  }

  private loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user: UserResponse) => this.userForm.patchValue(user.data),
      error: (err) => console.error('Error loading user:', err)
    });
  }
}
