import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";

import CacheService from "../../services/cache.service";
import TransactionService from "../../services/transaction.service";
import UserService from "../../services/user.service";
import { CardsActions } from "./cards.actions";

@Injectable()
export class CardsEffects {

  public readonly fetchSummary = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.FetchSummary),
      switchMap(() => this.transactionsService.api.summaryList()
        .pipe(map(res => !res.data.error
          ? CardsActions.FetchSuccess({ cards: res.data.value })
          : CardsActions.FetchFailed({ error: res.data.error })
        ))
      )
    )
  );
  public readonly fetchFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.FetchFailed),
      tap((error) => console.error(error))
    ), { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly cache: CacheService,
    private readonly transactionsService: TransactionService
  ) {
  }
}
