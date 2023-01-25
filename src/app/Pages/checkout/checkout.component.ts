import { Component } from '@angular/core';
import { DataService } from '../../shared/Services/data.service';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Store } from '../../shared/Interfaces/stores.interface';
import { NgForm } from '@angular/forms';
import { Order, Details } from '../../shared/Interfaces/order.interface';
import { ShoppingCartService } from '../../shared/Services/Shopping-cart.service';
import { Product } from '../../Pages/products/Interface/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  model = {
    name: '',
    store: '',
    shippingAddress:'',
    city:'',
  };
  isDelivery = true;
  cart: Product[] = [];
  stores: Store [] = []
  constructor(
    private dataSvc: DataService,
    private shoppingcartSvc: ShoppingCartService,
    private router: Router,
    private productSvc:ProductsService ){}
  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  OnPickupOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }
  onSubmit({value:formData}:NgForm): void{
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date:this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap ( res => console.log('Order', res)),
      switchMap ((order)=>{
        const orderID = order.id;
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({details, orderID});
      }),
      tap (() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(() => this.shoppingcartSvc.resetCart())
      )
    .subscribe();
  }
  private getStores():void{
    this.dataSvc.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores = stores))
    .subscribe()
  }
  private getCurrentDay():string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details : Details[] = [];
    this.cart.forEach((product:Product)=> {
      const {id:ProductId ,name:productName,qty:quantity,stock} = product;
      const updateStock = (stock - quantity);

      this.productSvc.updateStock(ProductId,updateStock)
      .pipe()
      .subscribe()

      details.push({ ProductId, productName, quantity});

    })
    return details;
  }
  private getDataCart():void{
    this.shoppingcartSvc.cartAction$
    .pipe(
      tap ((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }
}
