import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { UserListResponse, UserResponse } from "../../shared/models/Responses/user-response.model";
import { UserMapper } from "../utils/user-maper";
import { User } from "../../shared/models/user.model";
import { UserRequest } from "../../shared/models/Requests/user-request.model";

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    private apiUrl = environment.baseUrl + 'user';

    constructor ( private http: HttpClient) {}

    public getAllUsers(): Observable<User[]> {
        return this.http.get<UserListResponse>(this.apiUrl).pipe(
            map((response) => response.data.map(UserMapper.fromUserResponsetoUser))
        );
        
    }

    public getUserById(userId: string): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/${userId}`)
    }

    public upsertUser(user: UserRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl + '/upsert', user);
    }

    public toggleUserStatus(id: string, isActive: boolean): Observable<void> {
        return this.http.put<void>(this.apiUrl + '/toggle-status', { id, isActive });
      }
}
