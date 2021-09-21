import CategoriesState from "./categories/categories.state";
import ChartState from "./chart/chart.state";
import TransactionsState from "./transactions/transactions.state";
import AuthState from "./user/auth.state";

export default interface AppState {
  auth: AuthState;
  transactions: TransactionsState;
  categories: CategoriesState;
  chart: ChartState;
}
