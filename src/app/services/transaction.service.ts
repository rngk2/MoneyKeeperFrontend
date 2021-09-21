import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import ApiConnector from '../../api/api.connector';
import { TransactionsApi } from '../../api/api.interfaces';
import { BASE_SERVER_URL } from '../app.config';
import { convertToObserved, Observed } from "../utils";

@Injectable()
export default class TransactionService {

  private _api = new BehaviorSubject<Observed<TransactionsApi> | null>(null);

  constructor(
    @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
    private readonly apiConnector: ApiConnector
  ) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.transactions)));
  }

  public get api(): Observed<TransactionsApi> {
    return this._api.value!;
  }
}
