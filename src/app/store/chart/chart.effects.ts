import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";
import TransactionService from "../../services/transaction.service";
import { ChartActions } from "./chart.actions";

@Injectable()
export class ChartEffects {
  public readonly getTotal = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotal),
      switchMap(() => this.transactionsService.api.totalList()
        .pipe(map(res => !res.data.error
          ? ChartActions.GetTotalSuccess({ total: res.data.value })
          : ChartActions.OperationFailed(res.data.error)
        ))
      )
    )
  );
  public readonly getTotalForMonth = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotalForMonth),
      switchMap(() => this.transactionsService.api.totalMonthList()
        .pipe(map(res => !res.data.error
          ? ChartActions.GetTotalForMonthSuccess({ total: res.data.value })
          : ChartActions.OperationFailed(res.data.error)
        ))
      )
    )
  );
  public readonly getTotalForYear = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotalForYear),
      switchMap(() => this.transactionsService.api.totalYearList()
        .pipe(map(res => !res.data.error
          ? ChartActions.GetTotalForYearSuccess({ total: res.data.value })
          : ChartActions.OperationFailed(res.data.error)
        ))
      )
    )
  );
  public readonly getFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.OperationFailed),
      tap(error => console.error(error))
    ), { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly transactionsService: TransactionService
  ) {
  }
}
