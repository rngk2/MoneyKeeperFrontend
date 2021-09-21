import { createAction, props } from "@ngrx/store";

import { CreateUserDto, IError } from "../../../api/api.generated";
import IUser from "../../entities/user.entity";

export namespace AuthActions {
  enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    LOGOUT = '[Auth] Logout',
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_FAILURE = '[Auth] Signup Failure'
  }

  export const LogIn = createAction(AuthActionTypes.LOGIN, props<{ email: string, password: string }>());
  export const LogInSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<IUser>());
  export const LogInFailure = createAction(AuthActionTypes.LOGIN_FAILURE, props<IError>());
  export const LogOut = createAction(AuthActionTypes.LOGOUT);
  export const SignUp = createAction(AuthActionTypes.SIGNUP, props<CreateUserDto>());
  export const SignUpSuccess = createAction(AuthActionTypes.SIGNUP_SUCCESS, props<IUser>());
  export const SignUpFailure = createAction(AuthActionTypes.SIGNUP_FAILURE, props<IError>());
}

