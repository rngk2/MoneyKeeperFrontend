import {createAction, props} from "@ngrx/store";
import AppState from "../../state";

export enum HydrationActionTypes {
  HYDRATE = '[Hydration] Hydrate',
  HYDRATION_SUCCESS = '[Hydration] Success',
  HYDRATION_FAILURE = '[Hydration] Failure'
}

const Hydrate = createAction(HydrationActionTypes.HYDRATE);
const HydrationSuccess = createAction(HydrationActionTypes.HYDRATION_SUCCESS, props<{state: AppState}>());
const HydrationFailure = createAction(HydrationActionTypes.HYDRATION_FAILURE);

export const HydrationActions = {
  Hydrate,
  HydrationSuccess,
  HydrationFailure
}
