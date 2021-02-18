import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './components/admin/add-company/add-company.component';
import { GetCompaniesComponent } from './components/admin/get-companies/get-companies.component';
import { AddCouponComponent } from './components/company/add-coupon/add-coupon.component';
import { GetCouponsComponent } from './components/company/get-coupons/get-coupons.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserService } from './services/user.service';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      {
        path: "administrator", canActivate: [UserService], 
        children: [
          { path: "get-all/:type", component: GetCompaniesComponent , data: {animation: 'get'}},
          { path: "edit/:type", component: AddCompanyComponent , data: {animation: 'Add'}},
        ]
      },
      {
        path: "company", canActivate: [UserService], 
        children: [
          { path: "coupons", component: GetCouponsComponent , data: {animation: 'Get'}},
          { path: "coupons/:parm", component: GetCouponsComponent },
          { path: "coupon", component: AddCouponComponent , data: {animation: 'Add'}},
          { path: "coupon/:id", component: AddCouponComponent, data: {animation: 'Add'}},
          { path: "detals/:type", component: AddCompanyComponent , data: {animation: 'Add'}}
        ]
      },
      {
        path: "customer", canActivate: [UserService],
        children: [
          { path: "coupons", component: GetCouponsComponent , data: {animation: 'Get'}},
          { path: "coupons/:parm", component: GetCouponsComponent,  data: {animation: 'Get'} },
          { path: "detals/:type", component: AddCompanyComponent , data: {animation: 'Add'}}
        ]
      },


    ]
  },

  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(
    routes,
    { enableTracing: false } // <-- debugging purposes only
  )],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
