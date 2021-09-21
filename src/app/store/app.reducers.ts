import {cardsReducer} from "./cards/cards.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {InjectionToken} from "@angular/core";
import {authReducer} from "./user/auth.reducers";
import {AppFeatures} from "./app.features";
import {transactionsReducer} from "./transactions/transactions.reducers";
import {categoryReducer} from "./categories/categories.reducer";
import {chartReducer} from "./chart/chart.reducer";

export const appReducers: ActionReducerMap<any> | InjectionToken<any> = {
  [AppFeatures.Auth]: authReducer,
  [AppFeatures.Cards]: cardsReducer,
  [AppFeatures.Transactions]: transactionsReducer,
  [AppFeatures.Categories]: categoryReducer,
  [AppFeatures.Chart]: chartReducer
};
