import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../Interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>
  constructor(){}

  ngOnInit(): void {
  }
  onClick(): void{
   this.addToCartClick.emit(this.product)
  }
}
