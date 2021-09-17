import AppState from "../app.state";
import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import TransactionsState from "./transactions.state";
import {AppFeatures} from "../app.features";
import {TransactionsActions} from "./transactions.actions";
import {Observable} from "rxjs";
import Transaction from "../../entities/transaction.entity";
import {Injectable} from "@angular/core";
import {CreateTransactionDto, OrderType, TransactionDto, TransactionField} from "../../../api/api.generated";

const selectTransactionsFeature = createFeatureSelector<AppState, TransactionsState>(AppFeatures.Transactions);
const transactionsSelector = createSelector(
  selectTransactionsFeature,
  (state) => state.transactions
);

@Injectable()
export default class TransactionsStore {

  constructor(private readonly store: Store<AppState>) { }

  public get transactions(): Observable<Transaction[] | TransactionDto[] | undefined> {
    return this.store.select(transactionsSelector);
  }

  public transactionsForCategory(categoryId: number): Observable<object> {
    const selectCategoryTransactions = createSelector(
      selectTransactionsFeature,
      // @ts-ignore
      (state) => state.categoriesTransactions[categoryId]
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

  public fetchTransactions(params: {
    from: number,
    to: number,
    orderByField: TransactionField,
    order: OrderType
    searchPattern?: string,
  }): void {
    this.store.dispatch(TransactionsActions.GetTransactions(params));
  }
}
