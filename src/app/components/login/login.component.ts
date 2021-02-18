import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';
import { ClientType, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public clientType = ClientType;
  form: FormGroup;
  type: FormControl;
  email: FormControl;
  password: FormControl;
  hide = true;
  errorMessage:boolean;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,
    private router: Router, private title:Title,
    private location: Location, private user: UserService, private errorsService: ErrorsService) {
    this.form = this.formBuilder.group({
      type: [this.clientType.CUSTOMER, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    this.type = this.form.controls.type as FormControl;
    this.email = this.form.controls.email as FormControl;
    this.password = this.form.controls.password as FormControl;

  }

  ngOnInit(): void {
    this.title.setTitle('Coupons Login');
  }

  public login() {
    this.errorMessage = false;
    if (this.form.valid) {
      let param = new HttpParams().append("clientType", this.type.value).append("email", this.email.value).append("password", this.password.value);
      this.httpClient.get("http://localhost:8080/login", { params: param, responseType: "text" }).subscribe(
        token => {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("clientType", this.type.value);
          this.user.refresh();
          let url: string = sessionStorage.getItem("url");
          this.location.back();
        },
        error => {
          this.errorMessage = true;
        }
      )
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
