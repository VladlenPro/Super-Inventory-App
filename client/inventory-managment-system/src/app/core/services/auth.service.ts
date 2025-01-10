import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl + 'auth/login';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string; userType: string; }>(this.apiUrl, { username, password })
      .pipe(map((response) => {
        localStorage.setItem('token', response.token);
        return true;
      }),
        catchError(() => of(false))
      );
  }
}

