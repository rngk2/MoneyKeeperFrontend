import AuthState from "./user/auth.state";

export default interface AppState {
  auth: AuthState;
  cards: number;
}
