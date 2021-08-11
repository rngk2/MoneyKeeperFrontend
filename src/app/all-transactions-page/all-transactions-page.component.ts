import {Component, Inject, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import {Range} from "src/app/utils/Utils"
import {BASE_SERVER_URL} from "../app.config";

@Component({
  selector: 'all-transactions-list',
  templateUrl: './all-transactions-page.component.html',
  styleUrls: ['./all-transactions-page.component.scss']
})
export class AllTransactionsPageComponent implements OnInit {

  public transactions: Set<Transaction> = new Set<Transaction>()

  private step = 20
  private beginOffset = 0

  constructor(private readonly http: HttpClient,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string) { }

  public ngOnInit(): void {
    this.fetchTransactions(this.getNextRange())
  }

  private fetchTransactions(range: Range): void {
    this.http.get<Transaction[]>(this.serverUrl + `/transactions/${this.userService.getCurrentUser().id}/${range.begin}/${range.end}`)
      .subscribe(transactions => this.transactions =  new Set<Transaction>(this.sortByDate([...this.transactions, ...transactions])))
  }

  private sortByDate(transactions: Transaction[]): Transaction[] {
    return transactions.sort((a, b) => <any>new Date(b.timestamp) - <any>new Date(a.timestamp))
  }

  private getNextRange(): Range {
    const begin = this.beginOffset
    const end = begin + this.step
    this.beginOffset += this.step + 1

    return { begin, end }
  }

  public onScroll(): void {
    this.fetchTransactions(this.getNextRange())
  }
}
