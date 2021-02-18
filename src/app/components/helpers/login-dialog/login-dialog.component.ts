import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  errorMassage = "An appropriate login must be made to continue this operation";
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private router:Router) { }
  
  ngOnInit(): void {
    if(this.data?.error?.message){
      this.errorMassage = this.data.error.message;
    }
  }
}
