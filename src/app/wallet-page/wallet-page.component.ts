import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryFormComponent} from "../add-category-form/add-category-form.component";
import {Subject} from "rxjs";

@Component({
  selector: 'wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent {

  updateCategorySubject = new Subject<void>()

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              ) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddCategoryFormComponent, {
      width: '350px'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.updateCategorySubject.next()
    })
  }

}

