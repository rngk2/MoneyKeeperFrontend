import {Action} from "@ngrx/store";
import User from "../../entities/user.entity";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure'
}

export class LogIn implements Action {
  public readonly type: string = AuthActionTypes.LOGIN;
  constructor(public readonly payload: {email: string, password: string}) { }
}

export class LogInSuccess implements Action {
  public readonly type: string = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public readonly payload: User) { }
}

export class LogInFailure implements Action {
  public readonly type: string = AuthActionTypes.LOGIN_FAILURE;
  constructor(public readonly payload: {error: string}) { }
}

export type AuthActions =
  | LogIn
  | LogInSuccess
  | LogInFailure;
