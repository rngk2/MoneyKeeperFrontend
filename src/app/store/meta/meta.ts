import { MetaReducer } from "@ngrx/store";

import { stateManagerMetaReducer } from "./state-manager/state-manager.reducer";

export const appMetaReducers: MetaReducer[] = [stateManagerMetaReducer];
