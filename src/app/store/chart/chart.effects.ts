import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { LOCALSTORAGE_STATE_PATH } from "../../constants";
import LocalStorageService from "../../services/localStotage.service";

import TransactionService from "../../services/transaction.service";
import { ChartActions } from "./chart.actions";
import ChartStore from "./chart.store";

@Injectable()
export class ChartEffects {
  public readonly getTotal = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotal),
      withLatestFrom(this.chartStore.total),
      switchMap(([{ checkIfCached }, latestFromStore]) => {
          if (latestFromStore && latestFromStore.length > 0 && checkIfCached) {
            return of(latestFromStore).pipe(map(data => ChartActions.GetTotalSuccess({ total: data })));
          }
          return this.transactionsService.api.totalList()
            .pipe(map(res => {
                if (!res.data.error) {
                  this.localStorageService.append(LOCALSTORAGE_STATE_PATH, { total: res.data.value });
                  return ChartActions.GetTotalSuccess({ total: res.data.value });
                }
                return ChartActions.OperationFailed(res.data.error);
              }
            ));
        }
      )
    )
  );
  public readonly getTotalForMonth = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotalForMonth),
      withLatestFrom(this.chartStore.totalMonth),
      switchMap(([{ checkIfCached }, latestFromStore]) => {
          if (latestFromStore && Object.values(latestFromStore).length > 0 && checkIfCached) {
            return of(latestFromStore).pipe(map(data => ChartActions.GetTotalForMonthSuccess({ total: data })));
          }
          return this.transactionsService.api.totalMonthList()
            .pipe(map(res => {
                if (!res.data.error) {
                  this.localStorageService.append(LOCALSTORAGE_STATE_PATH, { totalMonth: res.data.value });
                  return ChartActions.GetTotalForMonthSuccess({ total: res.data.value });
                }
                return ChartActions.OperationFailed(res.data.error);
              }
            ));
        }
      )
    )
  );
  public readonly getTotalForYear = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.GetTotalForYear),
      withLatestFrom(this.chartStore.totalYear),
      switchMap(([{ checkIfCached }, latestFromStore]) => {
          if (latestFromStore && Object.values(latestFromStore).length > 0 && checkIfCached) {
            return of(latestFromStore).pipe(map(data => ChartActions.GetTotalForYearSuccess({ total: data })));
          }
          return this.transactionsService.api.totalYearList()
            .pipe(map(res => {
                if (!res.data.error) {
                  this.localStorageService.append(LOCALSTORAGE_STATE_PATH, { totalYear: res.data.value });
                  return ChartActions.GetTotalForYearSuccess({ total: res.data.value });
                }
                return ChartActions.OperationFailed(res.data.error);
              }
            ));
        }
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
    private readonly transactionsService: TransactionService,
    private readonly chartStore: ChartStore,
    private readonly localStorageService: LocalStorageService
  ) {
  }
}
