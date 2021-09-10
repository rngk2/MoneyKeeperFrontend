import {createAction, props} from "@ngrx/store";
import User from "../../entities/user.entity";
import {CreateUserDto, IError} from "../../../api/api.generated";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure'
}

const LogIn = createAction(AuthActionTypes.LOGIN, props<{email: string, password: string}>());
const LogInSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<User>());
const LogInFailure = createAction(AuthActionTypes.LOGIN_FAILURE, props<IError>());

const SignUp = createAction(AuthActionTypes.SIGNUP, props<CreateUserDto>());
const SignUpSuccess = createAction(AuthActionTypes.SIGNUP_SUCCESS, props<User>());
const SignUpFailure = createAction(AuthActionTypes.SIGNUP_FAILURE, props<IError>());

export const AuthActions = {
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure
};
