import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map } from "rxjs/operators";

import { LOCALSTORAGE_STATE_PATH } from "../../../constants";
import { StateManagerActions } from "./state-manager.actions";

@Injectable()
export class StateManagerEffects implements OnInitEffects {
  public readonly hydrate = createEffect(() =>
    this.actions$.pipe(
      ofType(StateManagerActions.Hydrate),
      map(() => {
        const storageValue = localStorage.getItem(LOCALSTORAGE_STATE_PATH);
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return StateManagerActions.HydrationSuccess({ state });
          }
          catch {
            localStorage.removeItem(LOCALSTORAGE_STATE_PATH);
          }
        }
        return StateManagerActions.HydrationFailure();
      })
    )
  );

  constructor(
    private readonly actions$: Actions
  ) {
  }

  ngrxOnInitEffects(): Action {
    return StateManagerActions.Hydrate();
  }
}
