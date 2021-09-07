import {Component, Inject, Input, OnInit} from '@angular/core';
import {Range} from '../../utils/Utils';
import Transaction from '../../entities/transaction.entity';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BASE_SERVER_URL} from '../../app.config';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import TransactionService from '../../services/transaction.service';
import {TransactionDto} from '../../../api/api.generated';

class RangeOffsetController {

  constructor(private beginOffset: number = 0,
              private step: number = 20) {
  }

  getNextRange(): Range {
    const begin = this.beginOffset;
    const end = begin + this.step;
    this.beginOffset += this.step + 1;

    return {begin, end};
  }
}

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  public transactions = new Array<TransactionDto>();
  public searchControl = new FormControl('');

  @Input() public filter: (value: any, index: number, array: any[]) => unknown = () => true;

  private rangeForAll = new RangeOffsetController();
  private rangeForSearch = new RangeOffsetController();

  private static readonly SEARCH_DEBOUNCE_DURATION = 400;

  constructor(private readonly http: HttpClient,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly transactionService: TransactionService) {
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(TransactionsListComponent.SEARCH_DEBOUNCE_DURATION), distinctUntilChanged())
      .subscribe(() => {
        this.rangeForSearch = this.rangeForAll = new RangeOffsetController();
        this.fetchTransactionsWithPattern(this.rangeForSearch.getNextRange());
      });
    this.fetchTransactions(this.rangeForAll.getNextRange());
  }

  private fetchTransactions(range: Range): void {
    this.transactionService.api.userTransactionsList({from: range.begin, to: range.end})
      .subscribe(res => this.transactions =
          this.transactionService.utils
          .sortByDate([...this.transactions, ...res.data.value])
          .filter(this.filter)
    );
  }

  private fetchTransactionsWithPattern(range: Range): void {
    const pattern = `%${this.searchControl.value}%`;
    this.transactionService.api.userTransactionsList({from: range.begin, to: range.end, like: pattern})
      .subscribe(res => {
        const append = range.begin === 0 ? new Set<Transaction>([]) : this.transactions;
        this.transactions =
          this.transactionService.utils
            .sortByDate([...append, ...res.data.value])
            .filter(this.filter);
      });
  }

  public onScroll(): void {
    this.searchControl!.value.length === 0 ?
      this.fetchTransactions(this.rangeForAll.getNextRange()) :
      this.fetchTransactionsWithPattern(this.rangeForSearch.getNextRange());
  }

  public inputTransactionName(): string {
    return Transaction.inputTransactionName;
  }
}
