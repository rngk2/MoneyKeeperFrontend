import AuthState from "./user/auth.state";
import CardsState from "./cards/cards.state";

export default interface AppState {
  auth: AuthState;
  cards: CardsState;
}
