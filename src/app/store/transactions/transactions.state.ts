import ITransaction from "../../entities/transaction.entity";

export default interface TransactionsState {
  transactions?: ITransaction[];
  categoriesTransactions?: Record<number, ITransaction[]>;
}
