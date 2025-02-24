import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
    providedIn: 'root'
})

export class ToastService {
    constructor(private message: NzMessageService) {}
    
    public showSuccess(message: string): void {
        this.message.success(message);
    }

    public showError(message: string): void {
        this.message.error(message);
    }

    public showWarning(message: string): void {
        this.message.warning(message);
    }

    public showInfo(message: string): void {
        this.message.info(message);
    } 
}
