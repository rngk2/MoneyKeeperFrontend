import { Action, createReducer, on } from "@ngrx/store";
import ITransaction, { INPUT_TRANSACTION_NAME } from "../../entities/transaction.entity";
import { TransactionsActions } from "./transactions.actions";
import TransactionsState from "./transactions.state";

const isIterable = (o: any) => o && typeof o[Symbol.iterator] === 'function';

const initialState: TransactionsState = {
  transactions: [],
};
const _transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.InitSearch, () => ({
    transactions: [],
  })),
  on(TransactionsActions.GetTransactionsSuccess, (state, updatedValue) => {
    return {
      transactions: (isIterable(state.transactions) ? [...state.transactions!, ...updatedValue.data] : updatedValue.data) as ITransaction[],
    };
  }),
  on(TransactionsActions.CreateTransactionSuccess, (state, { created }) => {
    return ({
      transactions: (isIterable(state.transactions) ? [...state.transactions!, created] : [created]) as ITransaction[],
      categoriesTransactions: created.categoryName !== INPUT_TRANSACTION_NAME
        ? (state.categoriesTransactions
          ? {
            ...state.categoriesTransactions,
            [created.categoryId!]: state.categoriesTransactions[created.categoryId!]
              ? [
                ...state.categoriesTransactions[created.categoryId!], created
              ]
              : [created]
          }
          : {
            [created.categoryId!]: [created]
          }) as (Record<string, ITransaction[]> | undefined)
        : state.categoriesTransactions
    });
  }),
  on(TransactionsActions.DeleteTransactionSuccess, (state, { deleted }) => {
    return {
      transactions: isIterable(state.transactions) ? state.transactions!.filter(t => t.id !== deleted.id) : [],
      categoriesTransactions: state.categoriesTransactions?.hasOwnProperty(deleted.categoryId!)
        ? {
          ...state.categoriesTransactions,
          [deleted.categoryId!]: state.categoriesTransactions[deleted.categoryId!].filter(t => t.id !== deleted.id)
        }
        : state.categoriesTransactions
    };
  }),
  on(TransactionsActions.GetTransactionsForCategorySuccess, (state, { data }) => {
    if (data.length < 1) {
      return state;
    }
    const item = {
      [data[0].categoryId!]: data
    } as Record<number, ITransaction[]>;

    return {
      ...state,
      categoriesTransactions: state.categoriesTransactions
        ? { ...state.categoriesTransactions, ...item }
        : item
    };
  })
);

export const transactionsReducer = (state: TransactionsState, action: Action) => _transactionsReducer(state, action);
