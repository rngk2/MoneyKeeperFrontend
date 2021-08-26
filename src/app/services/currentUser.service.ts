import {BehaviorSubject, Observable} from "rxjs";
import User from "../entities/user.entity";
import {LOCALSTORAGE_USER_PATH} from "../constants";
import {Injectable} from "@angular/core";

@Injectable()
export default class CurrentUserService {

  private userSubject: BehaviorSubject<User | null>;

  constructor() {
    this.userSubject = new BehaviorSubject<User | null>(null);
  }

  public getCurrentUserAsObservable(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public getCurrentUser(): User | null {
    if (!this.userSubject.value) {
      this.userSubject.next(CurrentUserService.getUserFromStorage());
    }
    return this.userSubject.value;
  }

  public setCurrentUser(user: User | null): void {
    CurrentUserService.saveUserToStorage(user); // always first!
    this.userSubject.next(user);
  }

  public removeCurrentUser(): void {
    CurrentUserService.removeUserFromStorage();
    this.userSubject.next(null);
  }

  private static getUserFromStorage(): User | null {
    const currentUser = localStorage.getItem(LOCALSTORAGE_USER_PATH);
    return currentUser && JSON.parse(currentUser);
  }

  private static saveUserToStorage(user: User | null): void {
    localStorage.setItem(LOCALSTORAGE_USER_PATH, JSON.stringify(user));
  }

  private static removeUserFromStorage(): void {
    localStorage.removeItem(LOCALSTORAGE_USER_PATH);
  }

}
