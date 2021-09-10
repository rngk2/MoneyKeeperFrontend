import {Action, createReducer, on} from "@ngrx/store";
import {AuthActions} from "./user.actions";
import AuthState from "./auth.state";

const initialState = { };
const _authReducer = createReducer(
  initialState,
  on(AuthActions.LogInSuccess, (state, updatedValue) => ({ user: updatedValue})),
  on(AuthActions.LogInFailure, (state, updatedValue) => ({ error: updatedValue})),
  on(AuthActions.SignUpSuccess, (state, updatedValue) => ({ user: updatedValue})),
  on(AuthActions.SignUpFailure, (state, updatedValue) => ({ error: updatedValue}))
);

export const authReducer = (state: AuthState, action: Action) => _authReducer(state, action);
