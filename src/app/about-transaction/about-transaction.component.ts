import {Component, Inject, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import categoriesState from "../state/categories.state";

@Component({
  selector: 'app-about-transaction',
  templateUrl: './about-transaction.component.html',
  styleUrls: ['./about-transaction.component.scss']
})
export class AboutTransactionComponent implements OnInit {

  constructor(private readonly httpClient: HttpClient,
              public readonly dialogRef: MatDialogRef<AboutTransactionComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: Transaction) {
  }


  ngOnInit(): void {
  }

  deleteTransaction(): void {
    this.httpClient.delete(environment.serverUrl + `/transactions/${this.data.id!}`)
      .subscribe(() => categoriesState.updateState())
    this.dialogRef.close()
  }
}
