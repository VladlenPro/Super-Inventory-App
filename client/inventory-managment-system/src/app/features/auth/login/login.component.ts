import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginResponse } from '../../../shared/models/Responses/LoginResponse';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public validateForm!: FormGroup;
  public errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private toastService: ToastService,

  ) { }

  public ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  public login(): void {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value;
      this.authService.login(username!, password!).subscribe({
        next: (response: LoginResponse) => {
          this.authService.saveUserData(response);
          this.toastService.showSuccess('Login successful');
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.toastService.showError('Invalid username or password');
        }
      });
    } else {
      this.toastService.showWarning('Please fill in all required fields');
    }

  }
}
