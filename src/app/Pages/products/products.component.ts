import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Product } from './Interface/product.interface';
import { ShoppingCartService } from '../../shared/Services/Shopping-cart.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  template: `
  <section class="products">
  <app-product
  (addToCartClick)="addToCart($event)"
  [product]="product" *ngFor="let product of products"></app-product>
</section>`,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products!: Product[];

    constructor(private productSvc: ProductsService, private ShoppingCartSvc: ShoppingCartService){}

    ngOnInit(): void {
      this.productSvc.getproducts()
    .pipe(
      tap( (products: Product[])=> this.products = products)
    )
    .subscribe();
    }
    addToCart(product: Product): void{
      console.log('Add to cart', product);
      this.ShoppingCartSvc.updateCart(product);
    }
}

