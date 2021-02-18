import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon, CouponCategory } from 'src/app/modules/coupon';
import { CompanyService } from 'src/app/services/company.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { DeleteItemComponent } from '../../helpers/delete-item/delete-item.component';
import { slideInAnimation } from 'src/app/files/route-animation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientType, UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Company } from 'src/app/modules/company';
import { AdminService } from 'src/app/services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-get-companies',
  templateUrl: './get-companies.component.html',
  styleUrls: ['./get-companies.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    slideInAnimation
  ],
})
export class GetCompaniesComponent implements OnInit {
  isCompanies: boolean;
  items: any[];
  hide = true;
  columnsToDisplay: string[] = ['email', 'password'];
  columnsToDisplay2: string[] = ['name'].concat(this.columnsToDisplay).concat('delete', 'edit');
  expandedElement: Coupon | null;
  private defultSort: Sort = { active: "name", direction: "desc" };
  private service;
  constructor(private user: UserService, public router: Router,
    public dialog: MatDialog, private title:Title,
    private adminService: AdminService,
    private errorsService: ErrorsService, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }

  ngOnInit(): void {
    switch (this.activatedRoute.snapshot.params.type) {
      case ClientType.COMPANY.toLowerCase():
        this.isCompanies = true;
        this.setItems(this.adminService.getAllCompanies());
        break;
      case ClientType.CUSTOMER.toLowerCase():
        this.setItems(this.adminService.getAllCustomers());
        break;
      default:
        this.router.navigate(["**"]);
        break;
    }
    let type = this.isCompanies? 'Companies': 'Customers';
    this.title.setTitle(`Your ${type}`);

  }

  private setItems(servise) {

    setTimeout(() => {
      servise.subscribe(items => {
        this.items = items;
        this.sortData(this.defultSort)
      },
        error => {
          this.errorsService.responseError(error);
        })
    }, 1000);
  }

  public sortData(sort: Sort) {
    const data = this.items.slice();
    if (!sort.active || sort.direction === '') {
      this.items = data;
      return;
    }
    this.defultSort = sort;
    const isAsc = sort.direction === 'asc';
    this.items = data.sort((a, b) => {
      return compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  public delete(event, item) {
   let dialog =  this.dialog.open(DeleteItemComponent, {
      data: {
        type: this.activatedRoute.snapshot.params.type,
        itemDesc: this.isCompanies ? item.name : `${item.laststName} ${item.firstName}`,
        service: this.isCompanies ? this.adminService.deleteCompany(item.id) : this.adminService.deleteCustomer(item.id),
      }
    });
    this.afterDialog(event, dialog);
  }

  public edit(event, item) {
    let dialog = this.dialog.open(AddCompanyComponent, {
      data: {
        item: item,
        type: this.activatedRoute.snapshot.params.type
      }
    });
    this.afterDialog(event, dialog);
  }

  private afterDialog(event, dialog) {
    event.stopPropagation();
    dialog.afterClosed().subscribe(elemnt => {
      // this.items[this.items.findIndex(item => item.id == elemnt.id)] = elemnt;
      this.items = null;
      this.ngOnInit();
    }, error => {
      this.ngOnInit();
    }

    )
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

