import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import AppState from "../state";
import AuthState from "./auth.state";
import {Injectable} from "@angular/core";
import User from "../../entities/user.entity";
import {Observable} from "rxjs";
import {TypedAction} from "@ngrx/store/src/models";

const selectAuthFeature = createFeatureSelector<AppState, AuthState>('auth');
const authSelector = createSelector(
  selectAuthFeature,
  (state) => state.user
);

@Injectable()
export default class UserStore {

  constructor(private readonly store: Store<AppState>) { }

  public getUser(): Observable<User | undefined> {
    return this.store.select(authSelector).pipe();
  }

  public dispatch(action: TypedAction<any>): void {
    this.store.dispatch(action)
  }
}
