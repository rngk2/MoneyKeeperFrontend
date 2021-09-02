import {Inject, Injectable} from '@angular/core';
import Transaction from '../entities/transaction.entity';
import {TransactionDto} from '../../api/api.generated';
import {TransactionsApi} from '../../api/api.interfaces';
import ApiConnector from '../../api/api.connector';
import {BASE_SERVER_URL} from '../app.config';
import {BehaviorSubject} from "rxjs";
import {convertToObserved, Observed} from "../utils/Utils";

class TransactionServiceUtils {
  public sortByDate(transactions: TransactionDto[]): TransactionDto[] {
    return transactions.sort((a, b) =>
      <number><unknown>new Date(b.timestamp!) - <number><unknown>new Date(a.timestamp!))
  }

  public calculateAmountForMonth(transactions: Transaction[] | TransactionDto[]): number {
    const currentMonth = new Date().getMonth();
    let amountForMonth = 0;
    for (const transaction of transactions) {
      if (new Date(transaction.timestamp!).getMonth() === currentMonth) {
        amountForMonth += transaction.amount!;
      }
    }

    return amountForMonth;
  }

  public getSumForTransactions(transactions: TransactionDto[]): number {
    return <number>transactions.map(t => t.amount)
      .reduce((acc, curr) => acc! + curr!)
  }
}

@Injectable()
export default class TransactionService {

  private _api = new BehaviorSubject<Observed<TransactionsApi> | null>(null)
  public readonly utils: TransactionServiceUtils = new TransactionServiceUtils();

  constructor(@Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly apiConnector: ApiConnector) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.transactions)));
    this.utils = new TransactionServiceUtils();
  }

  public get api(): Observed<TransactionsApi> {
    return this._api.value!
  }
};
