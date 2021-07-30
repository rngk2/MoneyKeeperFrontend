import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import HttpService from "./http.service";
import {environment} from "../../environments/environment";
import User from "../entities/user.entity";

interface ServerAuthResponse {
  ok?: User
  error?: string
}

@Injectable()
export default class UserService {

  private authProvider = new Subject<boolean>()
  private loggedIn = false

  private currentUser: User = {}

  constructor(private httpService: HttpService) { }

  isLoggedIn(): Observable<boolean> {
    return this.authProvider.asObservable();
  }

  logIn(credentials: { email: string, password: string }): void {
    console.log(credentials)
    this.httpService.post<ServerAuthResponse>(environment.serverUrl + '/users/auth', credentials)
    .subscribe((data: ServerAuthResponse) => {
     this.loggedIn = !data.error && !!data.ok?.accessToken;
      if (this.loggedIn) {
        this.currentUser = data.ok!
        localStorage.setItem('token', data.ok?.accessToken!)
        this.authProvider.next(this.loggedIn)
      }
    })
  }

  logOut(): void {
    localStorage.removeItem('token')
    this.loggedIn = false
    this.authProvider.next(this.loggedIn)
  }
}
