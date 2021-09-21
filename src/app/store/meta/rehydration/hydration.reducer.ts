import { Action, ActionReducer } from "@ngrx/store";
import { LOCALSTORAGE_STATE_PATH } from "../../../constants";
import AppState from "../../app.state";
import { CategoryActions } from "../../categories/categories.actions";
import { ChartActions } from "../../chart/chart.actions";
import { TransactionsActions } from "../../transactions/transactions.actions";
import { AuthActions } from "../../user/auth.actions";
import { HydrationActions } from "./hydration.actions";

const isHydrateSuccess = (action: Action): action is ReturnType<typeof HydrationActions.HydrationSuccess> => {
  return action.type === HydrationActions.HydrationSuccess.type;
};

const appActions: readonly Action[] = [
  ...Object.values(AuthActions),
  ...Object.values(CategoryActions),
  ...Object.values(ChartActions),
  ...Object.values(TransactionsActions)
];

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> =>
  (state, action) => {
    if (appActions.find(a => a.type === action.type)) {
      // fixme
      localStorage.setItem(LOCALSTORAGE_STATE_PATH, JSON.stringify(state));
    }
    return isHydrateSuccess(action)
      ? action.state
      : reducer(state, action);
  };

