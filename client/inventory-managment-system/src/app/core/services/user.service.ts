import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { UserListResponse, UserResponse } from "../../shared/models/Responses/user-response.model";
import { UserMapper } from "../utils/user-maper";
import { User } from "../../shared/models/user.model";
import { UserRequest } from "../../shared/models/Requests/user-request.model";
import { UserFilter } from "../../shared/models/user-filter.model";
import { ApiErrorHandlerService } from "./api-error-handler.service";

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    
    private apiUrl = environment.baseUrl + 'user';

    constructor ( 
        private http: HttpClient,
        private errorHandler: ApiErrorHandlerService
    ) {}

    public getAllUsers(): Observable<User[]> {
        return this.http.get<UserListResponse>(this.apiUrl).pipe(
            map((response) => response.data.map(UserMapper.fromUserResponsetoUser)),
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
        
    }

    public getUserById(userId: string): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/${userId}`).pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public upsertUser(user: UserRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl + '/upsert', user).pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public toggleUserStatus(id: string, isActive: boolean): Observable<void> {
        return this.http.put<void>(this.apiUrl + '/toggle-status', { id, isActive }).pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
      }
    
    public searchUsers(filters: UserFilter): Observable<User[]> {
        return  this.http.post<UserListResponse>(this.apiUrl + '/filter', filters).pipe(
            map((response) => response.data.map(UserMapper.fromUserResponsetoUser)),
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
      }
}
