import {Action, createReducer, on} from "@ngrx/store";
import TransactionsState from "./transactions.state";
import {TransactionsActions} from "./transactions.actions";
import {TransactionDto} from "../../../api/api.generated";
import Transaction from "../../entities/transaction.entity";

const isIterable = (o: any) => o && typeof o[Symbol.iterator] === 'function';

const initialState: TransactionsState = { };
const _transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.InitSearch, () => ({
    transactions: [],
  })),
  on(TransactionsActions.GetTransactionsSuccess, (state, updatedValue) => {
    return {
      transactions: isIterable(state.transactions) ? [...state.transactions!, ...updatedValue.data] : updatedValue.data,
    }
  }),
  on(TransactionsActions.CreateTransactionSuccess, (state, {created}) => {
    return ({
      transactions: isIterable(state.transactions) ? [...state.transactions!, created] : [created],
      categoriesTransactions: state.categoriesTransactions
        ? {
          ...state.categoriesTransactions,
          [created.categoryId!]: state.categoriesTransactions[created.categoryId!]
            ? [
              ...state.categoriesTransactions[created.categoryId!], created
            ]
            : [created]
        } : {
          [created.categoryId!]: [created]
        }
    })
  }),
  on(TransactionsActions.DeleteTransactionSuccess, (state, {deleted}) => {
    return {
      transactions: isIterable(state.transactions) ? state.transactions!.filter(t => t.id !== deleted.id) : [],
      categoriesTransactions: state.categoriesTransactions?.hasOwnProperty(deleted.categoryId!)
        ? {
          ...state.categoriesTransactions,
          [deleted.categoryId!]: state.categoriesTransactions[deleted.categoryId!].filter(t => t.id !== deleted.id)
        }
        : state.categoriesTransactions
    }
  }),
  on(TransactionsActions.GetTransactionsForCategorySuccess, (state, {data}) => {
    if (data.length < 1) {
      return state;
    }
    const item: Record<number, Transaction[] | TransactionDto[]> = {
      [data[0].categoryId!]: data
    }

    return {
      categoriesTransactions: state.categoriesTransactions ? {...state.categoriesTransactions, ...item} : item
    }
  })
);

export const transactionsReducer = (state: TransactionsState, action: Action) => _transactionsReducer(state, action);
