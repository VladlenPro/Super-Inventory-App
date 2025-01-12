import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../../shared/models/Responses/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl + 'auth/login';

  constructor(private http: HttpClient) { }
    
  public login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, {username, password});
  }

  public saveUserData(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('userTypes', JSON.stringify(response.userTypes))
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserTypes(): string[] {
    const userTypes = localStorage.getItem('userTypes');
    return userTypes ? JSON.parse(userTypes): [];
  }

  public logout(): void {
    localStorage.clear();
  }

}

