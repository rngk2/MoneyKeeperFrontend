import {Action, createReducer, on} from "@ngrx/store";
import TransactionsState from "./transactions.state";
import {TransactionsActions} from "./transactions.actions";
import Transaction from "../../entities/transaction.entity";
import {TransactionDto} from "../../../api/api.generated";

const initialState: TransactionsState = { };
const _transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.GetTransactionsSuccess, (state, updatedValue) => {
    if (updatedValue.isSearch) {
      return {
        transactions: state && state.isInSearchNow ? [...state.transactions!, ...updatedValue.data] : updatedValue.data,
        isInSearchNow: true
      }
    }
    return {
      transactions: state ? [...state.transactions!, ...updatedValue.data] : updatedValue.data,
      isInSearchNow: false
    }
  }),
  on(TransactionsActions.CreateTransactionSuccess, (state, {created}) => ({
    transactions: state ? [...state.transactions!, created] : [created],
    isInSearchNow: false
  })),
  on(TransactionsActions.DeleteTransactionSuccess, (state, {deleted}) => ({
    transactions: state.transactions!.filter(t => t.id !== deleted.id),
    isInSearchNow: false
  })),
  on(TransactionsActions.GetTransactionsForCategorySuccess, (state, {data}) => {
    if (data.length < 1) {
      return state;
    }
    const item: object = {};
    // @ts-ignore
    item[data[0].categoryId] = data
    return {
      categoriesTransactions: state ? {...state.categoriesTransactions!, item} : [item]
    }
  })
);

export const transactionsReducer = (state: TransactionsState, action: Action) => _transactionsReducer(state, action);
