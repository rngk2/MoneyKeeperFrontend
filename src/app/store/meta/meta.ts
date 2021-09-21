import { MetaReducer } from "@ngrx/store";

import { hydrationMetaReducer } from "./rehydration/hydration.reducer";

export const appMetaReducers: MetaReducer[] = [hydrationMetaReducer];
