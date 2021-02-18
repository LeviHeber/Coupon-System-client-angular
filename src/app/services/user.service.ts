import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Company } from '../modules/company';
import { Customer } from '../modules/customer';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  clientType: ClientType;
  userName: string;
  token: string;
  header: HttpHeaders;
  url: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private router: Router, private errorService: ErrorsService) {
    this.refresh();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.clientType && state.url.includes(this.clientType.toLowerCase());;
  }


  /**
  * name
  */
  public is(type: ClientType): boolean {
    return this.clientType == type;
  }

  public clear() {
  }
  public refresh() {
    this.token = sessionStorage.getItem(`token`);
    this.clientType = <ClientType>sessionStorage.getItem(`clientType`);
    this.header = new HttpHeaders({ token: sessionStorage.getItem(`token`) });
    if (this.clientType) {
      this.httpClient.get(`${this.url}/is-active`, { headers: this.header }).subscribe(isActive => {
        if (isActive) {
          this.setUserName();
        } else {
          sessionStorage.setItem("url", this.router.url);
          this.router.navigate(["/logout"]);
        }
      }, error => { });
    } else {
      this.userName = "guest";
    }
  }

  private setName(name: string) {
    this.userName = name;
    sessionStorage.setItem(`userName`, name);
  }

  private setUserName() {
    this.userName = sessionStorage.getItem(`userName`);
    if (this.userName) {
      return;
    }
    switch (this.clientType) {
      case ClientType.ADMINISTRATOR:
      this.setName("admin");
      break;
      case ClientType.COMPANY:
        this.httpClient.get(`${this.url}/company`, { headers: this.header }).subscribe(
          client => {
            this.setName((<Company>client).name);
          }, error => {
            console.log(error);
          });
        break;
      case ClientType.CUSTOMER:
        this.httpClient.get(`${this.url}/customer`, { headers: this.header }).subscribe(
          client => {
            let customer: Customer = <Customer>client;
            this.setName(`${customer.firstName} ${customer.lastName}`);
          }, error => {
            console.log(error.error);
          });
        break;
      default:
        this.userName = "guest defult";
    }
  }
}

export enum ClientType {
  ADMINISTRATOR = "ADMINISTRATOR",
  COMPANY = "COMPANY",
  CUSTOMER = "CUSTOMER"
}
