import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import User from "../entities/user.entity";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";



@Injectable()
export default class UserService {

  private userSubject: BehaviorSubject<User>
  public user: Observable<User>

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>({})
    this.user = this.userSubject.asObservable()
  }

  get userValue() {
    return this.userSubject.value
  }

  get currentUser(): Observable<User> {
    return this.userSubject.asObservable()
  }

  logIn(credentials: { email: string, password: string }): Observable<User> {
    return this.httpClient.post<User>(environment.serverUrl + '/users/authenticate', credentials, {withCredentials: true})
      .pipe(map(user => {
        this.userSubject.next(user)
        this.startRefreshTokenTimer()
        return user
      }))
  }

  logOut(): void {
    this.httpClient.post<any>(environment.serverUrl + '/users/revoke-token', {}, { withCredentials: true });
    this.stopRefreshTokenTimer();
    this.userSubject.next({});
  }

  refreshToken() {
    return this.httpClient.post<any>(environment.serverUrl + '/users/refresh-token', {}, {withCredentials: true})
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  // @ts-ignore
  private refreshTokenTimeout: NodeJS.Timeout

  private startRefreshTokenTimer(): void {
    const token_ttl = 5 * 1000
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), token_ttl)
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout)
  }

}
