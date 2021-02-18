import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-massage-snack',
  templateUrl: './massage-snack.component.html',
  styleUrls: ['./massage-snack.component.css']
})
export class MassageSnackComponent implements OnInit {

  constructor() { }
  massage = "you but the coupon"
  // @Inject(MAT_DIALOG_DATA) public massage:any
  ngOnInit(): void {
  }

}
