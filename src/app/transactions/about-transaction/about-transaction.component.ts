import {Component, Inject} from '@angular/core';
import Transaction from '../../entities/transaction.entity';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {BASE_SERVER_URL} from '../../app.config';
import CardsStore from '../../store/cards/cards.store';
import TransactionService from '../../services/transaction.service';

@Component({
  selector: 'app-about-transaction',
  templateUrl: './about-transaction.component.html',
  styleUrls: ['./about-transaction.component.scss']
})
export class AboutTransactionComponent {

  constructor(private readonly httpClient: HttpClient,
              private readonly dialogRef: MatDialogRef<AboutTransactionComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: Transaction,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly cardsStore: CardsStore,
              private readonly transactionService: TransactionService) {
  }

  public deleteTransaction(): void {
    (this.transactionService.api.transactionsDelete(this.data.id!))
      .subscribe(() => this.cardsStore.updateState());
    this.dialogRef.close();
  }
}
