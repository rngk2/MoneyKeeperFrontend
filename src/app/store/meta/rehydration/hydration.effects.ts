import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map } from "rxjs/operators";

import { LOCALSTORAGE_STATE_PATH } from "../../../constants";
import { HydrationActions } from "./hydration.actions";

@Injectable()
export class HydrationEffects implements OnInitEffects {
  public readonly hydrate = createEffect(() =>
    this.actions$.pipe(
      ofType(HydrationActions.Hydrate),
      map(() => {
        const storageValue = localStorage.getItem(LOCALSTORAGE_STATE_PATH);
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.HydrationSuccess({ state });
          }
          catch {
            localStorage.removeItem(LOCALSTORAGE_STATE_PATH);
          }
        }
        return HydrationActions.HydrationFailure();
      })
    )
  );

  constructor(
    private readonly actions$: Actions
  ) {
  }

  ngrxOnInitEffects(): Action {
    return HydrationActions.Hydrate();
  }
}
