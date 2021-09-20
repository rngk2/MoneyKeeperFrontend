import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, OnInitEffects} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {map} from "rxjs/operators";
import {HydrationActions} from "./hydration.actions";
import {LOCALSTORAGE_STATE_PATH} from "../../../constants";

@Injectable()
export class HydrationEffects implements OnInitEffects {

  constructor(private readonly actions$: Actions) { }

  public readonly hydrate = createEffect(() =>
    this.actions$.pipe(
      ofType(HydrationActions.Hydrate),
      map(() => {
        const storageValue = localStorage.getItem(LOCALSTORAGE_STATE_PATH);
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.HydrationSuccess({state});
          }
          catch {
            localStorage.removeItem(LOCALSTORAGE_STATE_PATH);
          }
        }
        return HydrationActions.HydrationFailure();
      })
    )
  )

  ngrxOnInitEffects(): Action {
    return HydrationActions.Hydrate();
  }
}
