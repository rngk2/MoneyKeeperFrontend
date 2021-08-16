import {Component, Inject, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import {Range} from "src/app/utils/Utils"
import {BASE_SERVER_URL} from "../app.config";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

class RangeOffsetController {

  constructor(private beginOffset: number = 0,
              private step: number = 20) { }

  getNextRange(): Range {
    const begin = this.beginOffset
    const end = begin + this.step
    this.beginOffset += this.step + 1

    return { begin, end }
  }
}

@Component({
  selector: 'all-transactions-list',
  templateUrl: './all-transactions-page.component.html',
  styleUrls: ['./all-transactions-page.component.scss']
})
export class AllTransactionsPageComponent implements OnInit {

  public transactions: Set<Transaction> = new Set<Transaction>()
  public searchControl = new FormControl('')
  public minDate = new Date(0)
  public maxDate = new Date()
  public timestampControl = new FormControl();

  private rangeForAll = new RangeOffsetController()
  private rangeForSearch = new RangeOffsetController()
  private static readonly SEARCH_DEBOUNCE_DURATION = 400

  constructor(private readonly http: HttpClient,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string) { }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(AllTransactionsPageComponent.SEARCH_DEBOUNCE_DURATION), distinctUntilChanged())
      .subscribe(() => {
        this.rangeForSearch = this.rangeForAll = new RangeOffsetController()
        this.fetchTransactionsWithPattern(this.rangeForSearch.getNextRange())
      })
    this.fetchTransactions(this.rangeForAll.getNextRange())
  }

  private fetchTransactions(range: Range): void {
    this.http.get<Transaction[]>(this.serverUrl + `/transactions/${this.userService.getCurrentUser().id}/${range.begin}/${range.end}`)
      .subscribe(transactions => this.transactions =  new Set<Transaction>(this.sortByDate([...this.transactions, ...transactions])))
  }

  private fetchTransactionsWithPattern(range: Range): void {
    const pattern = `${this.searchControl.value}%`
    this.http.get<Transaction[]>(this.serverUrl + `/transactions/${this.userService.getCurrentUser().id}/${range.begin}/${range.end}/${pattern}`)
      .subscribe(transactions => {
        const append = range.begin === 0 ? new Set<Transaction>([]) : this.transactions
        this.transactions = new Set<Transaction>(this.sortByDate([...append, ...transactions]))
      })
  }

  private sortByDate(transactions: Transaction[]): Transaction[] {
    return transactions.sort((a, b) => <number><unknown>new Date(b.timestamp) - <number><unknown>new Date(a.timestamp))
  }

  public onScroll(): void {
    this.searchControl!.value.length === 0 ?
      this.fetchTransactions(this.rangeForAll.getNextRange()) :
      this.fetchTransactionsWithPattern(this.rangeForSearch.getNextRange())
  }
}
