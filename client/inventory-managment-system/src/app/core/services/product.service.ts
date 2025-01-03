import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../shared/models/product.model";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly apiUrl: string = 'http://localhost:5041/api/product';

    constructor(private http: HttpClient) {}

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
}