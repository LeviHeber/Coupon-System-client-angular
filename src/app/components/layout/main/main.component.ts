import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from 'src/app/files/route-animation';
import { ClientType, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [slideInAnimation]

})
export class MainComponent implements OnInit {

  constructor(public user: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  links: NavLink[] = [new NavLink("Home", `/`)];
  activeLink: NavLink

  ngOnInit(): void {
    let type:ClientType = this.user.clientType;
    let typeLink:string = type?.toLowerCase();    
    switch (type) {
      case ClientType.ADMINISTRATOR:
        this.links.push(new NavLink("The Companies", `/${typeLink}/get-all/${ClientType.COMPANY.toLowerCase()}`));
        this.links.push(new NavLink("The Customers", `/${typeLink}/get-all/${ClientType.CUSTOMER.toLowerCase()}`));
        this.links.push(new NavLink("Add Company", `/${typeLink}/edit/${ClientType.COMPANY.toLowerCase()}`));
        this.links.push(new NavLink("Add Customer", `/${typeLink}/edit/${ClientType.CUSTOMER.toLowerCase()}`));

        break;

      case ClientType.COMPANY:
        this.links.push(new NavLink("Add Coupon", `/${typeLink}/coupon`));
        this.links.push(new NavLink("Your Coupons", `/${typeLink}/coupons`));
        this.links.push(new NavLink("Your Detals", `/${typeLink}/detals/${typeLink}`));
        break;

        case ClientType.CUSTOMER:
          this.links.push(new NavLink("Your Coupons", `/${typeLink}/coupons`));
          this.links.push(new NavLink("Your Detals", `/${typeLink}/detals/${typeLink}`));
          break;
  
      default:
        break;
    }
  }
}

class NavLink {
  constructor(public label: string, public link: string) {
  }
}