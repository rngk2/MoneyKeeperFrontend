import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import User from "../entities/user.entity";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export default class UserService {

  private userSubject: BehaviorSubject<User>
  private currentUser: User | undefined

  constructor(private readonly httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>({})
  }

  public getCurrentUserAsObservable(): Observable<User> {
    if (!this.currentUser && this.getCurrentUser()) {
      this.userSubject.next(this.getCurrentUser())
    }

    return this.userSubject.asObservable()
  }

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
    return this.httpClient.post<User>(environment.serverUrl + '/users/authenticate', credentials, {withCredentials: true})
      .pipe(map(user => {
        this.currentUser = user
        this.userSubject.next(this.currentUser)
        this.setCurrentUser(this.currentUser)
        this.startRefreshTokenTimer()
        return user
      }))
  }

  public logOut(): void {
    this.httpClient.post<any>(environment.serverUrl + '/users/revoke-token', {}, { withCredentials: true });
    this.removeCurrentUser()
    this.stopRefreshTokenTimer();
    this.userSubject.next({});
  }

  public refreshToken(): Observable<any> {
    return this.httpClient.post<any>(environment.serverUrl + '/users/refresh-token', {}, {withCredentials: true})
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
    const token_ttl = (1000 * 60) * 5
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), token_ttl)
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout)
  }

}
