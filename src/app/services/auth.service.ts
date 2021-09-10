import User from '../entities/user.entity';
import UserService from './user.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthApi} from "../../api/api.interfaces";
import {convertToObserved, Observed} from "../utils/Utils";
import ApiConnector from "../../api/api.connector";
import {map} from "rxjs/operators";
import {IError} from "../../api/api.generated";

@Injectable()
export default class AuthService {

  private _api = new BehaviorSubject<Observed<AuthApi> | null>(null);

  constructor(private readonly apiConnector: ApiConnector,
              private readonly userService: UserService) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.auth)))
  }

  private get api(): Observed<AuthApi> {
    return this._api.value!;
  }


  public logIn(credentials: { email: string, password: string }, cb?: () => void): Observable<User | IError> {
    return this.api.authenticateCreate({
      ...(credentials),
    }).pipe(map(res => {
        if (res.data.error) {
          return res.data.error;
        }
        const user: User = res.data.value as User;
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  public logOut(): void {
    sessionStorage.clear();
    this.stopRefreshTokenTimer();
  }

  public refreshToken(): void {
    this.api.refreshTokenCreate()
      .subscribe(res => {
        this.startRefreshTokenTimer();
      });
  }

  // @ts-ignore
  private refreshTokenTimeout: NodeJS.Timeout;
  private startRefreshTokenTimer(): void {
    const token_ttl = (1000 * 60) * 5;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), token_ttl);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
