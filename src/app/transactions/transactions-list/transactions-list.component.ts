import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ApiContractOrderType, ApiContractTransactionField } from '../../../api/api.generated';
import ITransaction, { INPUT_TRANSACTION_NAME } from '../../entities/transaction.entity';
import TransactionsStore from "../../store/transactions/transactions.store";
import { Range, RangeOffsetController } from '../../utils';
import { SEARCH_OPTIONS, TRANSACTIONS_LAZY_LOADING_OPTIONS } from "./transactions-list.constants";

@UntilDestroy()
@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  public transactions$: Observable<ITransaction[]>;
  public searchControl = new FormControl('');

  public readonly inputTransactionName = INPUT_TRANSACTION_NAME;

  @Input() public filter: (value: any) => boolean = () => true;

  private rangeForAll
    = new RangeOffsetController(TRANSACTIONS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, TRANSACTIONS_LAZY_LOADING_OPTIONS.STEP);
  private rangeForSearch
    = new RangeOffsetController(TRANSACTIONS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, TRANSACTIONS_LAZY_LOADING_OPTIONS.STEP);

  constructor(
    private readonly transactionsStore: TransactionsStore
  ) {
    this.transactions$ = transactionsStore.transactions;
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

  private fetchTransactions(range: Range): void {
    this.transactionsStore.fetchTransactions({
      from: range.begin,
      to: range.end,
      orderByField: ApiContractTransactionField.Timestamp,
      order: ApiContractOrderType.DESC
    });
  }

  private fetchTransactionsWithPattern(range: Range): void {
    const searchPattern = `%${ this.searchControl.value }%`;
    this.transactionsStore.fetchTransactions({
      from: range.begin,
      to: range.end,
      order: ApiContractOrderType.DESC,
      orderByField: ApiContractTransactionField.Timestamp,
      searchPattern
    });
  }
}
