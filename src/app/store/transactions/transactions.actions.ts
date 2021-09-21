import { createAction, props } from "@ngrx/store";

import { CreateTransactionDto, IError, OrderType, TransactionDto, TransactionField } from "../../../api/api.generated";

export namespace TransactionsActions {
  export const CreateTransaction = createAction(
    '[Transactions] Create one',
    props<CreateTransactionDto>()
  );
  export const CreateTransactionSuccess = createAction(
    '[Transactions] Create one: Success',
    props<{
      created: TransactionDto
    }>()
  );
  export const GetTransactions = createAction(
    '[Transactions] Get',
    props<{
      from: number,
      to: number,
      orderByField: TransactionField,
      order: OrderType
      searchPattern?: string,
    }>()
  );
  export const GetTransactionsSuccess = createAction(
    '[Transactions] Get: Success',
    props<{
      data: TransactionDto[]
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
      data: TransactionDto[],
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
      deleted: TransactionDto
    }>()
  );
  export const InitSearch = createAction('[Transactions] Init Search');
  export const OperationFailed = createAction(
    '[Transactions] Operation Failed',
    props<IError>()
  );
}

