import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MainComponent } from './components/layout/main/main.component';
import { AsideComponent } from './components/layout/aside/aside.component';
import { GetCouponsComponent } from './components/company/get-coupons/get-coupons.component';
import { AddCouponComponent } from './components/company/add-coupon/add-coupon.component';
import { UserService } from './services/user.service';
import { LogoutComponent } from './components/logout/logout.component';
import { LoadingComponent } from './components/helpers/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteItemComponent } from './components/helpers/delete-item/delete-item.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorDialogComponent } from './components/helpers/error-dialog/error-dialog.component';
import { LoginDialogComponent } from './components/helpers/login-dialog/login-dialog.component';
import { GetCompaniesComponent } from './components/admin/get-companies/get-companies.component';
import { AddCompanyComponent } from './components/admin/add-company/add-company.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MassageSnackComponent } from './components/helpers/massage-snack/massage-snack.component';







@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AsideComponent,
    GetCouponsComponent,
    AddCouponComponent,
    LogoutComponent,
    LoadingComponent,
    DeleteItemComponent,
    ErrorDialogComponent,
    LoginDialogComponent,
    GetCompaniesComponent,
    AddCompanyComponent,
    MassageSnackComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    {provide: MAT_DIALOG_DATA, useValue: null},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
