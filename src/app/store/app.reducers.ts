import { InjectionToken } from "@angular/core";
import { ActionReducerMap } from "@ngrx/store";

import { AppFeatures } from "./app.features";
import { categoryReducer } from "./categories/categories.reducer";
import { chartReducer } from "./chart/chart.reducer";
import { transactionsReducer } from "./transactions/transactions.reducers";
import { authReducer } from "./user/auth.reducers";

export const appReducers: ActionReducerMap<any> | InjectionToken<any> = {
  [AppFeatures.Auth]: authReducer,
  [AppFeatures.Transactions]: transactionsReducer,
  [AppFeatures.Categories]: categoryReducer,
  [AppFeatures.Chart]: chartReducer
};
