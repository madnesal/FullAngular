import { Component } from '@angular/core';
import { ShoppingCartService } from '../../../shared/Services/Shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  total$ = this.ShoppingCartSvs.totalAction$;
  cart$ = this.ShoppingCartSvs.cartAction$;

  constructor(private ShoppingCartSvs: ShoppingCartService){}
}
