import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,

  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
 }

}
