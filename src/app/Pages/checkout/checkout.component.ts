import { Component } from '@angular/core';
import { DataService } from '../../shared/Services/data.service';
import { tap } from 'rxjs/operators';
import { Store } from '../../shared/Interfaces/stores.interface';

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
  isDelivery = false;

  stores: Store [] = []
  constructor(private DataSvc: DataService){}
  ngOnInit(): void {
    this.getStores();
  }

  OnPickupOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }
  onSubmit(): void{
    console.log('Guardar')
  }
  private getStores():void{
    this.DataSvc.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores = stores))
    .subscribe()
  }
}
