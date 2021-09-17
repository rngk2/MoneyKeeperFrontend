import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, OnInitEffects} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import AppState from "../../app.state";
import {distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {HydrationActions} from "./hydration.actions";

@Injectable()
export class HydrationEffects implements OnInitEffects {

  constructor(private readonly actions$: Actions,
              private readonly store: Store<AppState>,) { }

  public readonly hydrate = createEffect(() =>
    this.actions$.pipe(
      ofType(HydrationActions.Hydrate),
      map(() => {
        const storageValue = localStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.HydrationSuccess({state});
          }
          catch {
            localStorage.removeItem('state');
          }
        }
        return HydrationActions.HydrationFailure();
      })
    )
  )

  public readonly serialize = createEffect(() =>
      this.actions$.pipe(
        ofType(HydrationActions.HydrationSuccess),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => localStorage.setItem("state", JSON.stringify(state)))
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return HydrationActions.Hydrate();
  }
}
