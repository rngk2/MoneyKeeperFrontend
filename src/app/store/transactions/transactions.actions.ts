import { createAction, props } from "@ngrx/store";

import {
  ApiContractCreateTransaction,
  ApiContractIError,
  ApiContractOrderType,
  ApiContractTransaction,
  ApiContractTransactionField
} from "../../../api/api.generated";

export namespace TransactionsActions {
  export const CreateTransaction = createAction(
    '[Transactions] Create one',
    props<ApiContractCreateTransaction>()
  );
  export const CreateTransactionSuccess = createAction(
    '[Transactions] Create one: Success',
    props<{
      created: ApiContractTransaction
    }>()
  );
  export const GetTransactions = createAction(
    '[Transactions] Get',
    props<{
      from: number,
      to: number,
      orderByField: ApiContractTransactionField,
      order: ApiContractOrderType
      searchPattern?: string,
    }>()
  );
  export const GetTransactionsSuccess = createAction(
    '[Transactions] Get: Success',
    props<{
      data: ApiContractTransaction[]
    }>()
  );
  export const GetTransactionsForCategory = createAction(
    '[Transactions] GetForCategory',
    props<{
      categoryId: number,
      from: number,
      to: number
    }>()
  );
  export const GetTransactionsForCategorySuccess = createAction(
    '[Transactions] GetForCategory: Success',
    props<{
      data: ApiContractTransaction[],
    }>()
  );
  export const DeleteTransaction = createAction(
    '[Transactions] Delete one',
    props<{
      id: number
    }>()
  );
  export const DeleteTransactionSuccess = createAction(
    '[Transactions] Delete one: Success',
    props<{
      deleted: ApiContractTransaction
    }>()
  );
  export const InitSearch = createAction('[Transactions] Init Search');
  export const OperationFailed = createAction(
    '[Transactions] Operation Failed',
    props<ApiContractIError>()
  );
}

