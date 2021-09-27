import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TRANSACTIONS_PREVIEW_MAX_LENGTH } from "../../category-card/category-card.constants";

import ITransaction from '../../entities/transaction.entity';
import TransactionsStore from "../../store/transactions/transactions.store";

@Component({
  selector: 'about-transaction',
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
    this.transactionsStore.fetchTransactionsForCategory({
      categoryId: this.data.id!,
      from: 0,
      to: TRANSACTIONS_PREVIEW_MAX_LENGTH
    });
    this.dialogRef.close();
  }
}
