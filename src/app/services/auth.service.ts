import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import ApiConnector from "../../api/api.connector";
import { IError } from "../../api/api.generated";
import { AuthApi } from "../../api/api.interfaces";
import IUser from '../entities/user.entity';
import { convertToObserved, Observed } from "../utils";

@Injectable()
export default class AuthService {

  // @ts-ignore
  private refreshTokenTimeout: NodeJS.Timeout;
  private _api = new BehaviorSubject<Observed<AuthApi> | null>(null);

  constructor(
    private readonly apiConnector: ApiConnector
  ) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.auth)));
  }

  private get api(): Observed<AuthApi> {
    return this._api.value!;
  }

  public logIn(credentials: { email: string, password: string }): Observable<IUser | IError> {
    return this.api.authenticateCreate({
      ...(credentials),
    }).pipe(map(res => {
      if (res.data.error) {
        return res.data.error;
      }
      const user: IUser = res.data.value as IUser;
      this.startRefreshTokenTimer();
      return user;
    }));
  }

  public logOut(): void {
    this.stopRefreshTokenTimer();
  }

  public refreshToken(): void {
    this.api.refreshTokenCreate()
      .subscribe(() => {
        this.startRefreshTokenTimer();
      });
  }

  private startRefreshTokenTimer(): void {
    const token_ttl = (1000 * 60) * 5;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), token_ttl);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
