import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientType, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

isCompany:boolean;
isCustomer:boolean;
isAdmin:boolean;
detals:string;
detalsString;

  constructor(public user:UserService, public activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.user.is(ClientType.ADMINISTRATOR);
    this.isCompany = this.user.is(ClientType.COMPANY);
    this.isCustomer = this.user.is(ClientType.CUSTOMER);
    this.detals = this.activatedRoute.snapshot.parent.url.toString() + "/detals";

  }

}
