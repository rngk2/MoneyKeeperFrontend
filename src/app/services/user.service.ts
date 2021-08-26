import {Inject, Injectable} from '@angular/core';
import {BASE_SERVER_URL} from '../app.config';
import {UsersApi} from '../../api/api.interfaces';
import ApiConnector from '../../api/api.connector';
import CurrentUserService from "./currentUser.service";
import {BehaviorSubject} from "rxjs";
import {convertToObserved, Observed} from "../utils/Utils";

@Injectable()
export default class UserService {

  private _api = new BehaviorSubject<Observed<UsersApi> | null>(null)

  constructor(public readonly currentUserService: CurrentUserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly apiConnector: ApiConnector) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.users)));
  }

  public get api(): Observed<UsersApi> {
    return this._api.value!
  }

  //
  // public getCurrentUserAsObservable(): Observable<User | null> {
  //   return this.userSubject.asObservable();
  // }
  //
  // public getCurrentUser(): User | null {
  //   if (!this.userSubject.value) {
  //     this.userSubject.next(UserService.getUserFromStorage());
  //   }
  //   return this.userSubject.value;
  // }
  //
  // public setCurrentUser(user: User | null): void {
  //   UserService.saveUserToStorage(user); // always first!
  //   this.userSubject.next(user);
  // }
  //
  // public removeCurrentUser(): void {
  //   UserService.removeUserFromStorage();
  //   this.userSubject.next(null);
  // }
  //
  // private static getUserFromStorage(): User | null {
  //   const currentUser = localStorage.getItem(LOCALSTORAGE_USER_PATH);
  //   return currentUser && JSON.parse(currentUser);
  // }
  //
  // private static saveUserToStorage(user: User | null): void {
  //   localStorage.setItem(LOCALSTORAGE_USER_PATH, JSON.stringify(user));
  // }
  //
  // private static removeUserFromStorage(): void {
  //   localStorage.removeItem(LOCALSTORAGE_USER_PATH);
  // }
}
