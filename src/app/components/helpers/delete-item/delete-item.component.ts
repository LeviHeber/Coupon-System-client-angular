import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {

  }

  public delete() {
   this.data.service.subscribe();
  }

}
