import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { OrderType, TransactionField } from '../../../api/api.generated';
import ITransaction, { INPUT_TRANSACTION_NAME } from '../../entities/transaction.entity';
import TransactionsStore from "../../store/transactions/transactions.store";
import { Range, RangeOffsetController } from '../../utils';
import { SEARCH_OPTIONS, TRANSACTIONS_LAZY_LOADING_OPTIONS } from "./transactions-list.constants";

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit, OnDestroy {

  public transactions?: ITransaction[];
  public searchControl = new FormControl('');

  @Input() public filter?: (value: any, index: number, array: any[]) => unknown;

  private readonly subs$ = new Subject<void>();

  private rangeForAll
    = new RangeOffsetController(TRANSACTIONS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, TRANSACTIONS_LAZY_LOADING_OPTIONS.STEP);
  private rangeForSearch
    = new RangeOffsetController(TRANSACTIONS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, TRANSACTIONS_LAZY_LOADING_OPTIONS.STEP);

  constructor(
    private readonly transactionsStore: TransactionsStore
  ) {
    transactionsStore.transactions
      .pipe(takeUntil(this.subs$))
      .subscribe(value => {
        if (value) {
          this.transactions = this.filter ? value.filter(this.filter) : value;
        }
      });
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(SEARCH_OPTIONS.DEBOUNCE_DURATION), distinctUntilChanged())
      .subscribe(() => {
        this.rangeForSearch
          = this.rangeForAll
          = new RangeOffsetController(TRANSACTIONS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, TRANSACTIONS_LAZY_LOADING_OPTIONS.STEP);
        this.fetchTransactionsWithPattern(this.rangeForSearch.getNextRange());
      });
    this.fetchTransactions(this.rangeForAll.getNextRange());
  }

  public onScroll(): void {
    this.searchControl!.value.length === 0
      ? this.fetchTransactions(this.rangeForAll.getNextRange())
      : this.fetchTransactionsWithPattern(this.rangeForSearch.getNextRange());
  }

  public getInputTransactionName(): string {
    return INPUT_TRANSACTION_NAME;
  }

  public ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.unsubscribe();
  }

  private fetchTransactions(range: Range): void {
    this.transactionsStore.fetchTransactions({
      from: range.begin,
      to: range.end,
      orderByField: TransactionField.Timestamp,
      order: OrderType.DESC
    });
  }

  private fetchTransactionsWithPattern(range: Range): void {
    const searchPattern = `%${ this.searchControl.value }%`;
    this.transactionsStore.fetchTransactions({
      from: range.begin,
      to: range.end,
      order: OrderType.DESC,
      orderByField: TransactionField.Timestamp,
      searchPattern
    });
  }
}
