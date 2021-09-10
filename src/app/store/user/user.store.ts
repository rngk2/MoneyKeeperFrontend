import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import AppState from "../state";
import AuthState from "./auth.state";
import {Injectable} from "@angular/core";
import User from "../../entities/user.entity";
import {Observable} from "rxjs";
import {TypedAction} from "@ngrx/store/src/models";
import {AuthActions} from "./auth.actions";
import {CreateUserDto} from "../../../api/api.generated";

const selectAuthFeature = createFeatureSelector<AppState, AuthState>('auth');
const authSelector = createSelector(
  selectAuthFeature,
  (state) => state.user
);

@Injectable()
export default class UserStore {

  constructor(private readonly store: Store<AppState>) { }

  public getUser(): Observable<User | undefined> {
    return this.store.select(authSelector);
  }

  public logIn(credentials: {email: string, password: string}): void {
    this.dispatch(AuthActions.LogIn({
      email: credentials.email,
      password: credentials.password
    }));
  }

  public signUp(user: CreateUserDto): void {
    this.dispatch(AuthActions.SignUp(user));
  }

  public logOut(): void {
    this.dispatch(AuthActions.LogOut);
  }

  private dispatch(action: TypedAction<any>): void {
    this.store.dispatch(action)
  }
}
