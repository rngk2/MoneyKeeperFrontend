import { Action, createReducer, on } from "@ngrx/store";

import { AuthActions } from "./auth.actions";
import AuthState from "./auth.state";

const initialState: AuthState = {};
const _authReducer = createReducer(
  initialState,
  on(AuthActions.LogInSuccess, (state, updatedValue) => ({ user: updatedValue })),
  on(AuthActions.LogInFailure, (state, updatedValue) => ({ error: updatedValue })),
  on(AuthActions.SignUpSuccess, (state, updatedValue) => ({ user: updatedValue })),
  on(AuthActions.SignUpFailure, (state, updatedValue) => ({ error: updatedValue })),
  on(AuthActions.LogOut, () => ({}))
);

export const authReducer = (state: AuthState, action: Action) => _authReducer(state, action);
