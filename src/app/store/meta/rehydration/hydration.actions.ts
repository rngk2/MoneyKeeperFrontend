import {createAction, props} from "@ngrx/store";
import AppState from "../../app.state";

export namespace HydrationActions {
  export const Hydrate = createAction(
    '[Hydration] Hydrate'
  );
  export const HydrationSuccess = createAction(
    '[Hydration] Success',
    props<{state: AppState}>()
  );
  export const HydrationFailure = createAction(
    '[Hydration] Failure'
  );
}

