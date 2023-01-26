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

    updateStock(ProductId: number, stock: number):Observable<any>{
      const body = {"stock": stock};
      return this.http.patch<any>(`${this.apiUrl}/${ProductId}`, body)
    }

}
