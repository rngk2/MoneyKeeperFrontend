import {Action, createReducer, on} from "@ngrx/store";
import {update} from "./cards-container.actions";

export const initialState = 0

const _cardsContainerReducer = createReducer(
  initialState,
  on(update, (state) => state + 1)
)

export const cardsContainerReducer = (state: number | undefined, action: Action): number => _cardsContainerReducer(state, action)
