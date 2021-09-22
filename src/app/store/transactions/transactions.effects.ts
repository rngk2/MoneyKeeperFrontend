import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";

import TransactionService from "../../services/transaction.service";
import { TransactionsActions } from "./transactions.actions";
import TransactionsStore from "./transactions.store";

@Injectable()
export class TransactionsEffects {
  public readonly createTransaction = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.CreateTransaction),
      switchMap(payload => this.transactionService.api.transactionsCreate(payload)
        .pipe(map(res => !res.data.error
          ? TransactionsActions.CreateTransactionSuccess({
            created: res.data.value
          })
          : TransactionsActions.OperationFailed(res.data.error)
        ))
      )
    )
  );
  public readonly getTransactions = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.GetTransactions),
      switchMap(payload => {
          return this.transactionService.api.userTransactionsList(payload)
            .pipe(map(res => !res.data.error
              ? TransactionsActions.GetTransactionsSuccess({
                data: res.data.value
              })
              : TransactionsActions.OperationFailed(res.data.error)
            ));
        }
      )
    )
  );
  public readonly getTransactionsForCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.GetTransactionsForCategory),
      mergeMap(payload =>
          of(payload)
            .pipe(withLatestFrom(this.transactionsStore.transactionsForCategory(payload.categoryId))),
        (payload, latestFromStore) => latestFromStore
      ),
      switchMap(([payload, latestFromStore]) => {
          if (latestFromStore.length > 0) {
            return of(latestFromStore).pipe(map(() => TransactionsActions.GetTransactionsForCategorySuccess({ data: latestFromStore })));
          }
          return this.transactionService.api.categoryTransactionsDetail(payload.categoryId, {
            from: payload.from,
            to: payload.to
          }).pipe(map(res => !res.data.error
            ? TransactionsActions.GetTransactionsForCategorySuccess({
              data: res.data.value,
            })
            : TransactionsActions.OperationFailed(res.data.error)
          ));
        }
      )
    )
  );
  public readonly deleteTransactions = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.DeleteTransaction),
      switchMap(payload => this.transactionService.api.transactionsDelete(payload.id)
        .pipe(map(res => !res.data.error
          ? TransactionsActions.DeleteTransactionSuccess({
            deleted: res.data.value
          })
          : TransactionsActions.OperationFailed(res.data.error))
        ))
    )
  );
  public readonly operationFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.OperationFailed),
      tap(error => console.error(error))
    ), { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly transactionService: TransactionService,
    private readonly transactionsStore: TransactionsStore
  ) {
  }
}
