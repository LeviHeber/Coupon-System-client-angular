import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  errorMassage = "It seems something is not working properly ...";
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  
  ngOnInit(): void {
    if(this.data.error){
      this.errorMassage = this.data.error;
    }
  }

}
