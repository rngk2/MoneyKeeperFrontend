import {Component, Inject} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import categoriesState from "../state/categories.state";
import {BASE_SERVER_URL} from "../app.config";

@Component({
  selector: 'app-about-transaction',
  templateUrl: './about-transaction.component.html',
  styleUrls: ['./about-transaction.component.scss']
})
export class AboutTransactionComponent {

  constructor(private readonly httpClient: HttpClient,
              private readonly dialogRef: MatDialogRef<AboutTransactionComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: Transaction,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string) {
  }

  deleteTransaction(): void {
    this.httpClient.delete(this.serverUrl + `/transactions/${this.data.id!}`)
      .subscribe(() => categoriesState.updateState())
    this.dialogRef.close()
  }
}
