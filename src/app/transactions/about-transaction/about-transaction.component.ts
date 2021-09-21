import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import ITransaction from '../../entities/transaction.entity';
import TransactionsStore from "../../store/transactions/transactions.store";

@Component({
  selector: 'app-about-transaction',
  templateUrl: './about-transaction.component.html',
  styleUrls: ['./about-transaction.component.scss']
})
export class AboutTransactionComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<AboutTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ITransaction,
    private readonly transactionsStore: TransactionsStore
  ) {
  }

  public deleteTransaction(): void {
    this.transactionsStore.removeTransaction(this.data.id!);
    this.dialogRef.close();
  }
}
