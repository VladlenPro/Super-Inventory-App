import { Injectable } from "@angular/core";
import { ToastService } from "./toast.service";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ApiErrorHandlerService {
    constructor(private toastService: ToastService) {}

    public handleError(error: HttpErrorResponse) {
        const errorMessage: string =
          (error.error && error.error.message) || 'An unexpected error occurred';
                    
        this.toastService.showError(errorMessage);
    
        return throwError(() => new Error(errorMessage));
      }
  }