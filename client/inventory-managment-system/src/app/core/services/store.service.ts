import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiErrorHandlerService } from "./api-error-handler.service";
import { Observable, map, catchError } from "rxjs";
import { StoreListResponse, StoreResponse } from "../../shared/models/Responses/store-response.model";
import { Store } from "../../shared/models/store.model";
import { StoreMapper } from "../utils/store-maper";
import { StoreFilter } from "../../shared/models/store-filter.model";
import { StoreRequest } from "../../shared/models/Requests/store-request.model";

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    

    private apiUrl = environment.baseUrl + 'store';

    constructor(
        private http: HttpClient,
        private errorHandler: ApiErrorHandlerService
    ) { }

    public getAllStores(): Observable<Store[]> {
        return this.http.get<StoreListResponse>(this.apiUrl).pipe(
            map((response) => response.data.map(StoreMapper.fromStoreResponsetoStore)),
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public getStoreById(storeId: string): Observable<StoreResponse> {
        return this.http.get<StoreResponse>(`${this.apiUrl}/${storeId}`).pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public upsertStore(store: StoreRequest): Observable<StoreResponse> {
        return this.http.post<StoreResponse>(this.apiUrl + '/upsert', store).pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public toggleStoreStatus(id: string, isActive: boolean): Observable<void> {
        return this.http.put<void>(this.apiUrl + '/toggle-status', { id, isActive }).pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public filterStores(filters: StoreFilter): Observable<Store[]> {
        return this.http.post<StoreListResponse>(this.apiUrl + '/filter', filters).pipe(
            map((response) => response.data.map(StoreMapper.fromStoreResponsetoStore)),
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

}