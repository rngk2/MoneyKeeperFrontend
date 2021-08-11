import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import {environment} from "../../environments/environment";
import {Range} from "src/app/utils/Utils"

@Component({
  selector: 'all-transactions-list',
  templateUrl: './all-transactions-page.component.html',
  styleUrls: ['./all-transactions-page.component.scss']
})
export class AllTransactionsPageComponent implements OnInit {

  private step = 20
  private beginOffset = 0

  transactions: Set<Transaction> = new Set<Transaction>()

  constructor(private http: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    this.fetchTransactions(this.getNextRange())
  }

  private fetchTransactions(range: Range): void {
    this.http.get<Transaction[]>(environment.serverUrl + `/transactions/${this.userService.getCurrentUser().id}/${range.begin}/${range.end}`)
      .subscribe(transactions => {
        this.transactions =  new Set<Transaction>(this.sortByDate([...this.transactions, ...transactions]))
        console.log({range, trs: this.transactions})
      })
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

  onScroll(): void {
    this.fetchTransactions(this.getNextRange())
    console.log({scroll: this.transactions})
  }
}
