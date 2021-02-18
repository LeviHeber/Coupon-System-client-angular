import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../components/helpers/error-dialog/error-dialog.component';
import { LoginDialogComponent } from '../components/helpers/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private router:Router, public dialog: MatDialog) { }

public loginError(response?){
  this.dialog.open(LoginDialogComponent, { data: response });

}

  public responseError(response:HttpErrorResponse){
    console.log(response);
    switch (response.status) {
      case 401:
        this.loginError(response);
        break;
        case 500:
          console.log(response.message);
          this.dialog.open(ErrorDialogComponent, { data: response });
          break;
          case 0:
            console.log(response.message);
            this.dialog.open(ErrorDialogComponent, { data: null });
            break;
  
      default:
        console.log(response);
        this.dialog.open(ErrorDialogComponent, { data: response });
        break;
    }
    
  }
}
