import {Action, ActionReducer} from "@ngrx/store";
import AppState from "../../app.state";
import {HydrationActions} from "./hydration.actions";

const isHydrateSuccess = (action: Action): action is ReturnType<typeof HydrationActions.HydrationSuccess> => {
  return action.type === HydrationActions.HydrationSuccess.type;
};

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => (state, action) => {
  return isHydrateSuccess(action)
    ? action.state
    : reducer(state, action);
};

