import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import CardsStore from '../../store/cards/cards.store';
import UserService from '../../services/user.service';
import TransactionService from '../../services/transaction.service';
import CacheService from '../../services/cache.service';
import {CACHE_TRANSACTIONS_PATH} from "../../constants";
import {Subject} from "rxjs";

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
              private readonly cache: CacheService) { }

  public addTransaction(): void {
    this.transactionService.api.transactionsCreate({
        categoryId: this.categoryId,
        amount: this.amount,
        timestamp: this.timestampControl.value,
        comment: this.comment
      }).subscribe((res) => {
        if (!res.data.error) {
          this.cache.remove(CACHE_TRANSACTIONS_PATH);
          this.cardsStore.updateState()
        }
        this.onSubmit.emit();
      });
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
