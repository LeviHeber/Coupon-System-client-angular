import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/modules/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ClientType, UserService } from 'src/app/services/user.service';
import { MassageSnackComponent } from '../helpers/massage-snack/massage-snack.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  durationInSeconds = 5;
  coupons:Coupon[];
  private url:string = 'http://localhost:8080';
  constructor(private httpClient:HttpClient, private user:UserService,
    private title:Title,
    private customerService:CustomerService, private _snackBar: MatSnackBar,
    private router:Router ,private errorService:ErrorsService) { }

  ngOnInit(): void {
    this.httpClient.get<Coupon[]>(`${this.url}/coupons`).subscribe(coupons=>{
      this.coupons = coupons;
    }, error=>{
      this.errorService.responseError(error);
      this.router.navigate([""]);
    });
    this.title.setTitle('Coupons');
  }

  public buydDisabled(coupon:Coupon):boolean{
    return  !(!this.user.clientType || this.user.is(ClientType.CUSTOMER) || coupon.amount <=0 );
  }
  public buy(couponId:number){
    if(this.user.is(ClientType.CUSTOMER)){
      this.customerService.purchaseCoupon(couponId).subscribe(res=>{
        this._snackBar.openFromComponent(MassageSnackComponent,{
          duration: this.durationInSeconds * 1000,
        },);
      }, error=>{
        this.errorService.responseError(error);
      });
    }
    else{
      this.errorService.loginError();
    }
  }
}
