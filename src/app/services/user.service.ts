import {Inject, Injectable} from '@angular/core';
import {BASE_SERVER_URL} from '../app.config';
import {UsersApi} from '../../api/api.interfaces';
import ApiConnector from '../../api/api.connector';
import {BehaviorSubject} from "rxjs";
import {convertToObserved, Observed} from "../utils/Utils";

@Injectable()
export default class UserService {

  private _api = new BehaviorSubject<Observed<UsersApi> | null>(null)

  constructor(
    @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
    private readonly apiConnector: ApiConnector
  ) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.users)));
  }

  public get api(): Observed<UsersApi> {
    return this._api.value!
  }
}
