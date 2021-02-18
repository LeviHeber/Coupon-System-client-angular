import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/modules/company';
import { Coupon, CouponCategory } from 'src/app/modules/coupon';
import { Customer } from 'src/app/modules/customer';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ClientType, UserService } from 'src/app/services/user.service';
import { DeleteItemComponent } from '../../helpers/delete-item/delete-item.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],


})
export class AddCompanyComponent implements OnInit {
  isUpdate: boolean;
  isAdmin:boolean = this.user.clientType == ClientType.ADMINISTRATOR;
  isCompany: boolean;
  typeAction:string;
  action: string = "Add";
  client: Company | Customer;
  form: FormGroup;
  id: FormControl;
  customerFirstName: FormControl;
  customerLastName: FormControl;
  companyName: FormControl;
  email: FormControl;
  password: FormControl;
  hide = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private title:Title, 
    public dialog: MatDialog, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private router: Router,
    private user: UserService, private companyService: CompanyService,
    private customerService: CustomerService,
    private adminService: AdminService, private errorsService: ErrorsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    this.form = this.formBuilder.group({
      id: [null],
      customerFirstName: [null],
      customerLastName: [null],
      companyName: [null],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.id = this.form.controls.id as FormControl;
    this.customerFirstName = this.form.controls.customerFirstName as FormControl;
    this.customerLastName = this.form.controls.customerLastName as FormControl;
    this.companyName = this.form.controls.companyName as FormControl;
    this.email = this.form.controls.email as FormControl;
    this.password = this.form.controls.password as FormControl;
  }

  ngOnInit(): void {
    let type = this.data?.type ? this.data.type : this.activatedRoute.snapshot.params.type;
    switch (type) {
      case ClientType.COMPANY.toLowerCase():
        this.isCompany = true;
        this.typeAction = 'Company';
        this.form.removeControl("customrFirstname");
        this.form.removeControl("customrLasttname");
        break;
        case ClientType.CUSTOMER.toLowerCase():
          this.typeAction = 'Customer';
          this.form.removeControl("companyName");
          break;
          default:
            this.router.navigate(["**"]);
            break;
          }
          this.getClient();
          this.title.setTitle(`${this.action} ${this.typeAction}`);
        }
        
        public addOrUpdate() {
          this.client = this.isCompany ?
          new Company(this.id.value, this.companyName.value, this.email.value, this.password.value) :
          new Customer(this.id.value, this.customerFirstName.value, this.customerLastName.value, this.email.value, this.password.value);
          if (this.form.valid) {
            if (this.isUpdate) {
              let service = this.isCompany ? this.adminService.updateCompany(this.client) : this.adminService.updateCustomer(this.client);
              service.subscribe(response => { }, error => {
                this.errorsService.responseError(error);
              });
      } else {
        let service = this.isCompany ? this.adminService.addCompany(this.client) : this.adminService.addCustomer(this.client);
        service.subscribe(response => { }, error => {
          this.errorsService.responseError(error);
        });
      }
      this.cancel();
    }
  }


  public cancel() {
    let navigate: string = this.isCompany ? 'company' : 'customer';
    this.router.navigate([`/${this.user.clientType.toLowerCase()}/get-all`, navigate], { relativeTo: this.activatedRoute });
    this.dialog?.closeAll();
  }


  public delete(event) {
    this.dialog.open(DeleteItemComponent, {
      data: {
        type: this.activatedRoute.snapshot.params.type,
        itemDesc: this.isCompany ? this.companyName.value : `${this.customerFirstName.value} ${this.customerLastName.value}`,
        service: this.isCompany ? this.adminService.deleteCompany(this.id.value) : this.adminService.deleteCustomer(this.id.value)
      }
    });
    event.stopPropagation();
    this.cancel();
  }

  private setClient(client) {
    this.id.setValue(client.id);
    this.customerFirstName.setValue(client.firstName);
    this.customerLastName.setValue(client.lastName);
    this.companyName.setValue(client.name);
    this.email.setValue(client.email);
    this.password.setValue(client.password);
    this.isUpdate = true;
    this.action = "Update";
    this.client = client;
  }

  private getClient() {
    if (this.data) {
      this.setClient(this.data.item);
      return;
    }
    if(!this.isAdmin){
      this.form.disable();
      let service:any = this.isCompany? this.companyService: this.customerService;
      service.getDetails().subscribe(client=>{
        this.setClient(client);
      },error=>{
        this.errorsService.responseError(error);
      });
      return;
    }
    let id = this.activatedRoute.snapshot.params.id;
    if (id) {
      let service: any = this.isCompany ? this.adminService.getCompany : this.adminService.getCustomer;
      service(id).subscribe(client => {
        if (client) {
          this.client = client;
          this.setClient(client);
        } else {
          this.router.navigate([`../${id}/not-found`], { relativeTo: this.activatedRoute });
        }
      }, error => {
        this.errorsService.responseError(error);
      });
      return;
    }

    this.client = this.isCompany ? new Company() : new Customer();
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}