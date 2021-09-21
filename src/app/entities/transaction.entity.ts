export default interface ITransaction {
  readonly id?: number;
  readonly categoryName?: string;
  readonly categoryId: number;
  readonly userId?: number;
  readonly amount: number;
  readonly timestamp?: string;
  readonly comment?: string;
}

export const INPUT_TRANSACTION_NAME = 'Earnings';
