import AuthState from "./user/auth.state";
import CardsState from "./cards/cards.state";
import TransactionsState from "./transactions/transactions.state";
import CategoriesState from "./categories/categories.state";
import ChartState from "./chart/chart.state";

export default interface AppState {
  auth: AuthState;
  cards: CardsState;
  transactions: TransactionsState;
  categories: CategoriesState;
  chart: ChartState;
}
