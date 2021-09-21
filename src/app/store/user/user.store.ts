import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import AppState from "../app.state";
import AuthState from "./auth.state";
import {Injectable} from "@angular/core";
import User from "../../entities/user.entity";
import {Observable} from "rxjs";
import {AuthActions} from "./auth.actions";
import {CreateUserDto} from "../../../api/api.generated";
import {AppFeatures} from "../app.features";

const selectAuthFeature = createFeatureSelector<AppState, AuthState>(AppFeatures.Auth);
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
    this.store.dispatch(AuthActions.LogIn(credentials));
  }

  public signUp(user: CreateUserDto): void {
    this.store.dispatch(AuthActions.SignUp(user));
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.LogOut());
  }
}
