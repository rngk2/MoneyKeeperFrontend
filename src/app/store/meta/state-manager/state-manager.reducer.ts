import { Action, ActionReducer } from "@ngrx/store";
import { LOCALSTORAGE_STATE_PATH } from "../../../constants";
import AppState from "../../app.state";
import { CategoryActions } from "../../categories/categories.actions";
import { ChartActions } from "../../chart/chart.actions";
import { TransactionsActions } from "../../transactions/transactions.actions";
import { AuthActions } from "../../user/auth.actions";
import { StateManagerActions } from "./state-manager.actions";

const isHydrateSuccess = (action: Action): action is ReturnType<typeof StateManagerActions.HydrationSuccess> => {
  return action.type === StateManagerActions.HydrationSuccess.type;
};

const actionsChangingState: readonly Action[] = [
  ...Object.values(AuthActions),
  ...Object.values(CategoryActions),
  ...Object.values(ChartActions),
  ...Object.values(TransactionsActions)
];

// fixme
const throughLocalStorage = (prevState: AppState | undefined, newState: AppState, action: Action): AppState => {
  if (prevState && actionsChangingState.find(a => a.type === action.type)) {
    localStorage.setItem(LOCALSTORAGE_STATE_PATH, JSON.stringify(newState));
  }
  return newState;
};

export const stateManagerMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> =>
  (state, action) => {
    if (action.type === AuthActions.LogOut.type) {
      state = undefined;
    }
    return isHydrateSuccess(action)
      ? action.state
      : throughLocalStorage(state, reducer(state, action), action);
  };
