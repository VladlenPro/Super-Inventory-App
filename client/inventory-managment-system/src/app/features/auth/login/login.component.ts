import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public username: string = '';
  // public password: string = '';
  // public errorMessage: string | null = null;
  public validateForm!: FormGroup; 
  public errorMessage: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  public ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  public login(): void {
    if(this.validateForm.valid) {
      const {username, password} = this.validateForm.value;
      this.authService.login(username!, password!).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/admin']);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (error) => {
          this.errorMessage = 'an error occured, Please try again';
        }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
   
  }
}
