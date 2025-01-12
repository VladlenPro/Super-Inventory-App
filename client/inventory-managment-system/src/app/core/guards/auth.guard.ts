import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate():boolean {
    const token = this.authService.getToken();
    const userTypes = this.authService.getUserTypes();
    
    if(!token || !userTypes.includes('Admin')) {
      this.router.navigate(['/']);
      return false
    }

    return true;
  }
}
