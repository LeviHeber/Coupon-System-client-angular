import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon, CouponCategory } from 'src/app/modules/coupon';
import { CompanyService } from 'src/app/services/company.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { DeleteItemComponent } from '../../helpers/delete-item/delete-item.component';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],


})
export class AddCouponComponent implements OnInit {
  couponCategory = CouponCategory;
  isUpdate: boolean;
  action: string = "add";
  coupon: Coupon;
  form: FormGroup;
  id: FormControl;
  company: FormControl;
  category: FormControl;
  title: FormControl;
  description: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  amount: FormControl;
  price: FormControl;
  image: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Coupon,
    public dialog: MatDialog, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private router: Router,
    private pageTitle:Title,
    private companyService: CompanyService, private errorsService: ErrorsService) {

    this.form = this.formBuilder.group({
      id: [null],
      company: [null],
      category: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      price: [null, [Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      image: [null]
    });

    this.id = this.form.controls.id as FormControl;
    this.company = this.form.controls.company as FormControl;
    this.category = this.form.controls.category as FormControl;
    this.title = this.form.controls.title as FormControl;
    this.description = this.form.controls.description as FormControl;
    this.startDate = this.form.controls.startDate as FormControl;
    this.endDate = this.form.controls.endDate as FormControl;
    this.amount = this.form.controls.amount as FormControl;
    this.price = this.form.controls.price as FormControl;
    this.image = this.form.controls.image as FormControl;
  }

  ngOnInit(): void {

    this.getCoupon();
    this.pageTitle.setTitle(`${this.action} Coupon`);
  }

  public addOrUpdate() {
    this.coupon = new Coupon(this.id.value, this.company.value, this.category.value, this.title.value,
      this.description.value, this.startDate.value, this.endDate.value, this.amount.value, this.price.value, this.image.value);
    if (this.form.valid) {
      if (this.isUpdate) {
        this.companyService.updateCoupon(this.coupon).subscribe(response => { }, error => {
          this.errorsService.responseError(error);
        });
      } else {
        this.companyService.addCoupon(this.coupon).subscribe(response => { }, error => {
          this.errorsService.responseError(error);
        });
      }
      this.cancel();
    }
  }


  public cancel() {
    this.router.navigate(['/company/coupons']);
    this.dialog?.closeAll();
  }


  public delete(event) {
    this.dialog.open(DeleteItemComponent, {
      data: {
        type: "coupon",
        itemDesc: this.coupon.title,
        service: this.companyService.deleteCoupon(this.coupon.id)
      }
    });
    event.stopPropagation();
    this.router.navigate(["/company/coupons"], { relativeTo: this.activatedRoute });
  }

  private setCoupon(coupon) {
    this.id.setValue(coupon.id);
    this.company.setValue(coupon.company);
    this.category.setValue(coupon.category);
    this.title.setValue(coupon.title);
    this.description.setValue(coupon.description);
    this.startDate.setValue(coupon.startDate);
    this.endDate.setValue(coupon.endDate);
    this.amount.setValue(coupon.amount);
    this.price.setValue(coupon.price);
    this.image.setValue(coupon.image);
    this.isUpdate = true;
    this.action = "update";
    this.coupon = coupon;
  }

  private getCoupon() {
    if (this.data) {
      this.setCoupon(this.data);
      return;
    }
    let id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.companyService.getCoupons().subscribe(coupons => {
        this.coupon = coupons.find((coupon) => coupon.id == id);
        if (this.coupon) {
          this.setCoupon(this.coupon);
        } else {
          this.router.navigate([`../${id}/not-found`], { relativeTo: this.activatedRoute });
        }
      }, error => {
        this.errorsService.responseError(error);
      });
      return;
    }

    this.coupon = new Coupon();
  }
  

}