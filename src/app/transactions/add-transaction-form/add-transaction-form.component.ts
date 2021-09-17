import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import CardsStore from '../../store/cards/cards.store';
import UserService from '../../services/user.service';
import TransactionService from '../../services/transaction.service';
import CacheService from '../../services/cache.service';
import {CACHE_TRANSACTIONS_PATH} from "../../constants";
import {Subject} from "rxjs";
import TransactionsStore from "../../store/transactions/transactions.store";

@Component({
  selector: 'add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent implements OnDestroy {

  public amount!: number;
  public comment!: string;
  public timestampControl = new FormControl(new Date());
  public minDate = new Date(0);
  public maxDate = new Date();

  @Input() public categoryId!: number;

  @Output() public onSubmit = new EventEmitter();

  private readonly subs = new Subject<void>();

  constructor(private readonly cardsStore: CardsStore,
              private readonly userService: UserService,
              private readonly transactionService: TransactionService,
              private readonly cache: CacheService,
              private readonly transactionsStore: TransactionsStore) { }

  public addTransaction(): void {
    this.transactionsStore.createTransaction({
        categoryId: this.categoryId,
        amount: this.amount,
        timestamp: this.timestampControl.value,
        comment: this.comment
    });
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
