import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl='http://localhost:3000/products';
  constructor(private http: HttpClient) { }

    getproducts():Observable<Product[]>{
      return this.http.get<Product[]>(this.apiUrl);
    }

}
