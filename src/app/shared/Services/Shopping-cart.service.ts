import { Injectable, NgModule } from '@angular/core';
import { Product } from '../../Pages/products/Interface/product.interface';
import {Observable, BehaviorSubject } from 'rxjs';
@Injectable(
  {providedIn: 'root'}
)
export class ShoppingCartService{
  products :Product[] = [];

  private cartSubjet = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubjet = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubjet.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubjet.asObservable();
  }

    updateCart(product: Product): void{
      this.addToCart(product);
      this.quantityProducts();
      this.calcTotal();
    }

    resetCart():void{
      this.cartSubjet.next([]);
      this.totalSubject.next(0);
      this.quantitySubjet.next(0);
    }

    private addToCart(product:Product): void{
      const isProductInCart =  this.products.find(({id}) => id == product.id)

      if (isProductInCart) {
        isProductInCart.qty +=1;
      } else {
        this.products.push({ ...product, qty: 1})
      }

      this.cartSubjet.next(this.products)
    }

    private  quantityProducts():void{
      const quantity = this.products.reduce( (acc,prod) => acc +  prod.qty, 0);
      this.quantitySubjet.next(quantity)
    }

    private calcTotal():void{
      const total = this.products.reduce( (acc,prod) => acc +(prod.price * prod.qty), 0);
      this.totalSubject.next(total);

    }
}
