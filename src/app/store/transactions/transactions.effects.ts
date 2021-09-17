import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TransactionsActions} from "./transactions.actions";
import {map, switchMap, tap} from "rxjs/operators";
import TransactionService from "../../services/transaction.service";
import CardsStore from "../cards/cards.store";
import TransactionsStore from "./transactions.store";

@Injectable()
export class TransactionsEffects {
  constructor(private readonly actions$: Actions,
              private readonly transactionService: TransactionService,
              private readonly cardsStore: CardsStore,
              private readonly transactionsStore: TransactionsStore) { }

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
                data: res.data.value,
                isSearch: !!payload.searchPattern
              })
              : TransactionsActions.OperationFailed(res.data.error)
            ))
        }
      )
    )
  );

  public readonly getTransactionsForCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.GetTransactionsForCategory),
      switchMap(payload => {
          return this.transactionService.api.categoryTransactionsDetail(
            payload.categoryId, {
            from: payload.from,
            to: payload.to
          }).pipe(map(res => !res.data.error
              ? TransactionsActions.GetTransactionsForCategorySuccess({
                data: res.data.value,
              })
              : TransactionsActions.OperationFailed(res.data.error)
            ))
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
    ), {dispatch: false}
  );
}
