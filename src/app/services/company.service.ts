import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../modules/company';
import { Coupon, CouponCategory } from '../modules/coupon';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyService{
  private url:string = 'http://localhost:8080/company';
 
  constructor(
    private httpClient:HttpClient,
    private user:UserService
    ) {}

  public addCoupon(coupon:Coupon):Observable<any>{
    return this.httpClient.post(`${this.url}/coupon`,coupon,{headers: this.user.header});
  }
  public updateCoupon(coupon:Coupon){
    return this.httpClient.put(`${this.url}/coupon`,coupon,{headers: this.user.header});
  }
  public getCoupons():Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>(`${this.url}/coupon`,{headers: this.user.header});
  }
  public getCouponsByCategory(category:CouponCategory):Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>(`${this.url}/coupon-category/${category}`,{headers: this.user.header});
  }
  public getCouponsByPrice(maxPrice:Number):Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>(`${this.url}/coupon-price/${maxPrice}`,{headers: this.user.header});
  }
  public deleteCoupon(id:number):Observable<{}>{
   return this.httpClient.delete(`${this.url}/coupon/${id}`,{headers: this.user.header});
  }
  public getDetails():Observable<Company>{    
    return this.httpClient.get(this.url ,{headers: this.user.header});
  }
}
