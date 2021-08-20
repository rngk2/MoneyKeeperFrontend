import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import User from "../entities/user.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BASE_SERVER_URL} from "../app.config";
import Transaction from "../entities/transaction.entity";

type Total = Map<string, number>

@Injectable()
export default class UserService {

  private userSubject: BehaviorSubject<User>
  private currentUser: User | undefined

  constructor(private readonly http: HttpClient,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string)
  {
    this.userSubject = new BehaviorSubject<User>({})
  }

  public fetchSummary(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.serverUrl +
        `/users/${this.getCurrentUser().id}/summary`, {
        withCredentials: true,
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.getCurrentUser().jwtToken}`
        })
      })
  }

  public fetchTotalForYear(): Observable<Total> {
    return this.http.get<Total>(this.serverUrl + `/users/${this.getCurrentUser().id}/total/year`)
  }

  public fetchTotalForMonth(): Observable<Total> {
    return this.http.get<Total>(this.serverUrl + `/users/${this.getCurrentUser().id}/total/month`)
  }

  public getCurrentUserAsObservable(): Observable<User> {
    if (!this.currentUser && this.getCurrentUser()) {
      this.userSubject.next(this.getCurrentUser())
    }

    return this.userSubject.asObservable()
  }

  // TODO
  public getCurrentUser(): User {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      return {}
    }
    return JSON.parse(localStorage.getItem("currentUser")!)
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  public removeCurrentUser(): void {
    localStorage.removeItem("currentUser")
  }

  public logIn(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(this.serverUrl + '/users/authenticate', credentials, {withCredentials: true})
      .pipe(map(user => {
        this.currentUser = user
        this.userSubject.next(this.currentUser)
        this.setCurrentUser(this.currentUser)
        this.startRefreshTokenTimer()
        return user
      }))
  }

  public logOut(): void {
    this.http.post<any>(this.serverUrl + '/users/revoke-token', {}, { withCredentials: true });
    this.removeCurrentUser()
    this.stopRefreshTokenTimer();
    this.userSubject.next({});
  }

  public refreshToken(): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/users/refresh-token', {}, {withCredentials: true})
      .pipe(map((response) => {
        this.userSubject.next({...this.userSubject.value, jwtToken: response.jwtToken});
        this.setCurrentUser(this.userSubject.value)
        this.startRefreshTokenTimer();
        return response;
      }));
  }

  // @ts-ignore
  private refreshTokenTimeout: NodeJS.Timeout
  private startRefreshTokenTimer(): void {
    const token_ttl = 1000 * 5
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), token_ttl)
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout)
  }

}
