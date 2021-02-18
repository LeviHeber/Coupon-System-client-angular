import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon, CouponCategory } from 'src/app/modules/coupon';
import { CompanyService } from 'src/app/services/company.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';
import { DeleteItemComponent } from '../../helpers/delete-item/delete-item.component';
import { slideInAnimation } from 'src/app/files/route-animation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientType, UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-get-coupons',
  templateUrl: './get-coupons.component.html',
  styleUrls: ['./get-coupons.component.css'],
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
export class GetCouponsComponent implements OnInit {
  couponCategory = CouponCategory;
  price: FormControl;
  category: FormControl;
  form: FormGroup;
  filterDesc: string;
  coupons: Coupon[];
  columnsToDisplay: string[] = ['title', 'category', 'startDate', 'endDate', 'price'];
  columnsToDisplay2: string[] = [];
  expandedElement: Coupon | null;
  private defultSort: Sort = { active: "startDate", direction: "desc" };
  private service;
  constructor(private user: UserService, public router: Router,
    public dialog: MatDialog, private formBuilder: FormBuilder,
    private companyServise: CompanyService, private customerService:CustomerService,
    private errorsService: ErrorsService, private activatedRoute: ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute= function (){return false;};
    this.form = this.formBuilder.group({
      category: [null],
      price: [null, [Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    });
    this.category = this.form.controls.category as FormControl;
    this.price = this.form.controls.price as FormControl;
  }

  ngOnInit(): void {
    switch (this.user.clientType) {
      case ClientType.COMPANY:
        this.service = this.companyServise;
        this.columnsToDisplay = this.columnsToDisplay.concat('amount')
        this.columnsToDisplay2 = this.columnsToDisplay.concat(['delete', 'edit'])
        break;
      case ClientType.CUSTOMER:
        this.service = this.customerService;
        this.columnsToDisplay2.push('company');
        this.columnsToDisplay2 = this.columnsToDisplay2.concat(this.columnsToDisplay);
        break;
    }
    setTimeout(() => {
      this.initCoupon();
    }, 1000);
  }

  private initCoupon(parm?) {
    if (!parm) {
      parm = this.activatedRoute.snapshot.params?.parm;
    }
    if (!isNaN(parm)) {
      this.service.getCouponsByPrice(parm).subscribe(coupons => {
        this.filterDesc = `Highest price: ${parm}`;
        this.setCoupons(coupons);
      }, error => {
        this.errorsService.responseError(error);
      })
      return;
    }
    if (Object.values(CouponCategory).includes(parm)) {
      this.service.getCouponsByCategory(CouponCategory[parm]).subscribe(coupons => {
        this.filterDesc = `Category: ${parm}`;
        this.setCoupons(coupons);
      }, error => {
        this.errorsService.responseError(error);
      })
      return;
    }
    this.service.getCoupons().subscribe(coupons => {
      this.setCoupons(coupons);
    }, error => {
      this.errorsService.responseError(error);
    })
  }

  public sortData(sort: Sort) {
    const data = this.coupons.slice();
    if (!sort.active || sort.direction === '') {
      this.coupons = data;
      return;
    }
    this.defultSort = sort;
    const isAsc = sort.direction === 'asc';
    this.coupons = data.sort((a, b) => {
      return compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  public delete(event, coupon: Coupon) {
    this.dialog.open(DeleteItemComponent, {
      data: {
        type: "coupon",
        itemDesc: coupon.title,
        service: this.companyServise.deleteCoupon(coupon.id)
      }
    });
    this.afterDialog(event);
  }

  public edit(event, coupon: Coupon) {
    this.dialog.open(AddCouponComponent, { data: coupon });
    this.afterDialog(event);
  }

  public doFilter(parm) {
    if (parm) {
      if (!isNaN(parm)) {
        this.category.setValue('');
      }
      if (Object.values(CouponCategory).includes(parm)) {
        this.price.setValue('');
      }
      this.router.navigate(["coupons", parm], { relativeTo: this.activatedRoute.parent });
    }
  }
  private setCoupons(coupons: Coupon[]) {
    this.coupons = coupons;
    this.sortData(this.defultSort);
  }

  private afterDialog(event) {
    event.stopPropagation();
    this.dialog.afterAllClosed.subscribe(e => {
      this.coupons = null;
      this.initCoupon();
    }, e => {
      this.coupons = null;
      this.initCoupon();
    }

    )
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

