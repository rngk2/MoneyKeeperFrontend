import { createAction, props } from "@ngrx/store";

import AppState from "../../app.state";

export namespace StateManagerActions {
  export const Hydrate = createAction(
    '[StateManager] Hydrate'
  );
  export const HydrationSuccess = createAction(
    '[StateManager] Hydrate Success',
    props<{ state: AppState }>()
  );
  export const HydrationFailure = createAction(
    '[StateManager] Hydrate Failure'
  );
}
