import {createAction, props} from '@ngrx/store';
import {IError} from "../../../api/api.generated";
import {Summary} from "./types";

enum CardsActionsTypes {
  FETCH_SUMMARY = '[Cards] Fetch Summary',
  FETCH_SUCCESS = '[Cards] Fetch Success',
  FETCH_FAILED = '[Cards] Fetch Failed',
  FETCH_CACHED = '[Cards] Fetch From Cache'
}

const FetchSummary = createAction(CardsActionsTypes.FETCH_SUMMARY);
const FetchFromCache = createAction(CardsActionsTypes.FETCH_CACHED);
const FetchSuccess = createAction(CardsActionsTypes.FETCH_SUCCESS, props<{cards: Summary}>());
const FetchFailed = createAction(CardsActionsTypes.FETCH_FAILED, props<{error: IError}>());

export const CardsActions = {
  FetchSummary,
  FetchSuccess,
  FetchFailed,
  FetchFromCache
}
