import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import TransactionService from "../../services/transaction.service";
import { ChartActions } from "./chart.actions";
import { map, switchMap, tap } from "rxjs/operators";

@Injectable()
export class ChartEffects {
  constructor(private readonly actions$: Actions,
              private readonly transactionsService: TransactionService) {
  }

  public readonly getTotal = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotal),
      switchMap(() => this.transactionsService.api.totalList()
        .pipe(map(res => !res.data.error
          ? ChartActions.GetSuccessful({ total: res.data.value })
          : ChartActions.GetFailed(res.data.error)
        ))
      )
    )
  );

  public readonly getTotalForMonth = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotalForMonth),
      switchMap(() => this.transactionsService.api.totalMonthList()
        .pipe(map(res => !res.data.error
          ? ChartActions.GetSuccessfulMonth({ total: res.data.value })
          : ChartActions.GetFailed(res.data.error)
        ))
      )
    )
  );

  public readonly getTotalForYear = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotalForYear),
      switchMap(() => this.transactionsService.api.totalYearList()
        .pipe(map(res => !res.data.error
          ? ChartActions.GetSuccessfulYear({ total: res.data.value })
          : ChartActions.GetFailed(res.data.error)
        ))
      )
    )
  );

  public readonly getFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetFailed),
      tap(error => console.error(error))
    ), { dispatch: false }
  );
}
