import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../modules/coupon';
import { Customer } from '../modules/customer';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string = 'http://localhost:8080/customer';

  constructor(private httpClient: HttpClient, private user: UserService) { }

  public getCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(`${this.url}/coupon`, { headers: this.user.header });
  }
  public getCouponsByCategory(category: string): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(`${this.url}/coupon-category/${category}`, { headers: this.user.header });
  }
  public getCouponsByPrice(maxPrice: number): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(`${this.url}/coupon-price/${maxPrice}`, { headers: this.user.header });
  }
  public purchaseCoupon(id: number) {
    return this.httpClient.put(`${this.url}/coupon-purchase`, id, { headers: this.user.header });
  }
  public getDetails(): Observable<Customer> {
    return this.httpClient.get<Customer>(this.url, { headers: this.user.header });
  }
}
