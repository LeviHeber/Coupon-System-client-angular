import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../modules/company';
import { Customer } from '../modules/customer';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url: string = 'http://localhost:8080/admin';

  constructor(
    private httpClient:HttpClient,
    private user: UserService) { }

  public addCompany(company: Company): Observable<any> {
    return this.httpClient.post(`${this.url}/company`, company, { headers: this.user.header });
  }
  public updateCompany(company: Company) {
    return this.httpClient.put(`${this.url}/company`, company, { headers: this.user.header });

  }
  public deleteCompany(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.url}/company/${id}`, { headers: this.user.header });
  }
  public getCompany(id: number): Observable<Company> {
    return this.httpClient.get(`${this.url}/company/${id}`, { headers: this.user.header });
  }
  public getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.url}/companies`, { headers: this.user.header });
  }
  public addCustomer(customer: Customer): Observable<any> {
    return this.httpClient.post(`${this.url}/customer`, customer, { headers: this.user.header });

  }
  public updateCustomer(customer: Customer) {
    return this.httpClient.put(`${this.url}/customer`, customer, { headers: this.user.header });

  }
  public deleteCustomer(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.url}/customer/${id}`, { headers: this.user.header });
  }
  public getCustomer(id: number): Observable<Customer> {
    return this.httpClient.get(`${this.url}/customer/${id}`, { headers: this.user.header });

  }

  public getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.url}/customers`, { headers: this.user.header });
  }


}
