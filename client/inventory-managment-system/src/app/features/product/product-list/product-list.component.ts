import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit  {
  public products: Product[] = [];

  constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
}
