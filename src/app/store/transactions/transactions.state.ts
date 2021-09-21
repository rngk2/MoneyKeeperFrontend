import Transaction from "../../entities/transaction.entity";
import {TransactionDto} from "../../../api/api.generated";

export default interface TransactionsState {
  transactions?: Transaction[] | TransactionDto[];
  categoriesTransactions?: Record<number, Transaction[] | TransactionDto[]>;
}
