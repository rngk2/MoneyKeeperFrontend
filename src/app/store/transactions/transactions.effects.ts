import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { INPUT_TRANSACTION_NAME } from "../../entities/transaction.entity";

import TransactionService from "../../services/transaction.service";
import CategoriesStore from "../categories/categories.store";
import ChartStore from "../chart/chart.store";
import { TransactionsActions } from "./transactions.actions";
import TransactionsStore from "./transactions.store";

@Injectable()
export class TransactionsEffects {
  public readonly createTransaction = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.CreateTransaction),
      withLatestFrom(this.categoriesStore.categories),
      switchMap(([payload, categories]) => this.transactionService.api.transactionsCreate(payload)
        .pipe(map(res => {
            let created = res.data.value;
            if (categories.find(value => value.id === payload.categoryId)?.name === INPUT_TRANSACTION_NAME) {
              created = Object.assign(res.data.value, { categoryName: INPUT_TRANSACTION_NAME });
            }
            return !res.data.error
              ? TransactionsActions.CreateTransactionSuccess({ created })
              : TransactionsActions.OperationFailed(res.data.error);
          }
        ))
      )
    )
  );
  public readonly createTransactionSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.CreateTransactionSuccess),
      tap(({ created }) => {
        this.chartStore.fetchAll();
        if (created.categoryName !== INPUT_TRANSACTION_NAME) {
          this.categoriesStore.fetchOverviewForCategory(created.categoryId!);
        }
      })
    ), { dispatch: false }
  );
  public readonly getTransactions = createEffect(() => {
      return this.actions$.pipe(
        ofType(TransactionsActions.GetTransactions),
        switchMap(payload => this.transactionService.api.userTransactionsList(payload)
          .pipe(map(res => !res.data.error
            ? TransactionsActions.GetTransactionsSuccess({
              data: res.data.value
            })
            : TransactionsActions.OperationFailed(res.data.error)
          ))
        )
      );
    }
  );
  public readonly getTransactionsForCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.GetTransactionsForCategory),
      switchMap(payload => of(payload).pipe(withLatestFrom(this.transactionsStore.transactionsForCategory(payload.categoryId)))),
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
  public readonly deleteTransaction = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.DeleteTransaction),
      switchMap(payload => this.transactionService.api.transactionsDelete(payload.id)
        .pipe(map(res => {
            return !res.data.error
              ? TransactionsActions.DeleteTransactionSuccess({
                deleted: res.data.value
              })
              : TransactionsActions.OperationFailed(res.data.error);
          })
        ))
    )
  );
  public readonly deleteTransactionSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.DeleteTransactionSuccess),
      tap(({ deleted }) => {
        this.chartStore.fetchAll();
        if (deleted.categoryName !== INPUT_TRANSACTION_NAME) {
          this.categoriesStore.fetchOverviewForCategory(deleted.categoryId!);
        }
      })
    ), { dispatch: false }
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
    private readonly transactionsStore: TransactionsStore,
    private readonly chartStore: ChartStore,
    private readonly categoriesStore: CategoriesStore
  ) {
  }
}
