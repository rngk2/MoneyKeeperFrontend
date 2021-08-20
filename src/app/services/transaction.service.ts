import {Inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import UserService from "./user.service";
import {BASE_SERVER_URL} from "../app.config";
import CardsContainerStore from "../store/cards-store/cards-container.store";
import Transaction from "../entities/transaction.entity";
import {Observable} from "rxjs";
import {Range} from "../utils/Utils";
import {TransactionDto} from "../../gen/myApi";


@Injectable()
export default class TransactionService {

  constructor(private readonly http: HttpClient,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string) {
  }

  public getTransactions(range: Range): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.serverUrl +
        `/transactions/${this.userService.getCurrentUser().id}/${range.begin}/${range.end}`, {
            withCredentials: true,
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.userService.getCurrentUser().jwtToken}`
      })
    })
  }

  public getTransactionsWithPattern(range: Range, pattern: string): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.serverUrl +
        `/transactions/${this.userService.getCurrentUser().id}/${range.begin}/${range.end}/${pattern}`)
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(this.serverUrl +
        '/transactions', transaction)
  }

  public deleteTransaction(id: number): Observable<Transaction> {
    return this.http
      .delete<Transaction>(this.serverUrl +
        `/transactions/${id}`)
  }

  // utils
  public sortByDate(transactions: TransactionDto[]): TransactionDto[] {
    return transactions.sort((a, b) =>
      <number><unknown>new Date(b.timestamp!) - <number><unknown>new Date(a.timestamp!))
  }

  public calculateAmountForMonth(transactions: Transaction[]): number {
    const currentMonth = new Date().getMonth()
    let amountForMonth = 0
    for (const transaction of transactions)
      if (new Date(transaction.timestamp!).getMonth() === currentMonth)
        amountForMonth += transaction.amount

    return amountForMonth
  }

  public getSumForTransactions(transactions: TransactionDto[]): number {
    return <number>transactions.map(t => t.amount)
      .reduce((acc, curr) => acc! + curr!)
  }

}
