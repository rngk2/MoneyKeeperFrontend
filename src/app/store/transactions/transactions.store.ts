import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CreateTransactionDto, OrderType, TransactionField } from "../../../api/api.generated";
import ITransaction from "../../entities/transaction.entity";
import { AppFeatures } from "../app.features";
import AppState from "../app.state";
import { TransactionsActions } from "./transactions.actions";
import TransactionsState from "./transactions.state";

const selectTransactionsFeature = createFeatureSelector<AppState, TransactionsState>(AppFeatures.Transactions);
const transactionsSelector = createSelector(
  selectTransactionsFeature,
  (state) => state.transactions
);

@Injectable()
export default class TransactionsStore {

  constructor(
    private readonly store: Store<AppState>
  ) {
  }

  public get transactions(): Observable<ITransaction[] | undefined> {
    return this.store.select(transactionsSelector);
  }

  public transactionsForCategory(): Observable<Record<number, ITransaction[]> | undefined> {
    const selectCategoryTransactions = createSelector(
      selectTransactionsFeature,
      (state) => state.categoriesTransactions
    );
    return this.store.select(selectCategoryTransactions);
  }

  public fetchTransactionsForCategory(data: {
    categoryId: number,
    from: number,
    to: number
  }): void {
    this.store.dispatch(TransactionsActions.GetTransactionsForCategory(data));
  }

  public createTransaction(transaction: CreateTransactionDto): void {
    this.store.dispatch(TransactionsActions.CreateTransaction(transaction));
  }

  public removeTransaction(transactionId: number): void {
    this.store.dispatch(TransactionsActions.DeleteTransaction({ id: transactionId }));
  }

  public fetchTransactions(params: {
    from: number,
    to: number,
    orderByField: TransactionField,
    order: OrderType
    searchPattern?: string,
  }): void {
    if (params.searchPattern || /* fixme */ params.from === 0) {
      this.store.dispatch(TransactionsActions.InitSearch());
    }
    this.store.dispatch(TransactionsActions.GetTransactions(params));
  }
}
