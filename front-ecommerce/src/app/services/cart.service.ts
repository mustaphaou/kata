import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = environment.apiBase + '/cart';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addToCart(product: Product): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, product);
  }

  updateQuantity(id: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.apiUrl}/${id}?quantity=${quantity}`, {});
  }

  removeProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
