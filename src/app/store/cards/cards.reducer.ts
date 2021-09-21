import {Action, createReducer, on} from '@ngrx/store';
import {CardsActions} from './cards.actions';
import CardsState from "./cards.state";

const initialState: CardsState = { };
const _cardsReducer = createReducer(
  initialState,
  on(CardsActions.FetchSuccess, (state, {cards}) => ({cards})),
  on(CardsActions.FetchFailed, (state, {error}) => ({error})),
  on(CardsActions.FetchFromCache, (state) => state),
);

export const cardsReducer = (state: CardsState, action: Action) => _cardsReducer(state, action);
