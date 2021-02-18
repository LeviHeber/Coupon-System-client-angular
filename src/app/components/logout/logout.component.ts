import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    public user: UserService,
    private errorsService: ErrorsService
  ) { }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:8080/logout", { headers: this.user.header }).subscribe(
      () => { }, error => { this.errorsService.responseError(error); });
    sessionStorage.clear();
    this.user.refresh();
    this.router.navigateByUrl("");
  }


}
