import {AuthActions, AuthActionTypes, LogInSuccess} from "./user.actions";
import {Action, createAction, createReducer, on, State} from "@ngrx/store";
import User from "../../entities/user.entity";

export interface AuthState {
  user?: User;
  errorMessage?: string;
}

export const initialState: AuthState = {
  user: undefined,
  errorMessage: undefined
};

const _authReducer = createReducer(
  initialState,
  on(createAction(AuthActionTypes.LOGIN_SUCCESS), (state, updatedValue) => ({ ...state, prop: updatedValue }))
)

export const authReducer = (state: any, action: Action) => _authReducer(state, action);
//
// export const authReducer = (state: User | undefined = initialState, action: AuthActions) => {
//   switch (action.type) {
//     case AuthActionTypes.LOGIN_SUCCESS:
//       return {
//         ...state,
//         ...action.payload
//       };
//
//     case AuthActionTypes.LOGIN_FAILURE:
//       return {
//         ...state,
//         ...action.payload
//       };
//
//     default:
//       return state;
//   }
// }
