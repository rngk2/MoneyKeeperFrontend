import * as auth from "./user/user.reducers";
import {cardsContainerReducer} from "./cards-store/cards-container.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {InjectionToken} from "@angular/core";

export const reducers: ActionReducerMap<any> | InjectionToken<any> = {
  auth: auth.authReducer
};
