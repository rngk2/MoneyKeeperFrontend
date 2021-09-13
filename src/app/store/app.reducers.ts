import {cardsReducer} from "./cards/cards.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {InjectionToken} from "@angular/core";
import {authReducer} from "./user/auth.reducers";

export const appReducers: ActionReducerMap<any> | InjectionToken<any> = {
  auth: authReducer,
  cards: cardsReducer
};
