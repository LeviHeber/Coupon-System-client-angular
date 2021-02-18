import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorObserver } from 'rxjs';
import { ErrorsService } from 'src/app/services/errors.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private router:Router,
    private httpClient:HttpClient,
    public user:UserService,
    private errorsService:ErrorsService
  ) { }

  ngOnInit(): void {
  }
  public loginTuch(){
    this.router.navigate(["login"]);   
  }
  public logout(){ 
        this.router.navigateByUrl("/logout");
    }
}
