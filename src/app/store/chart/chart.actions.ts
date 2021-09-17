import {createAction, props} from "@ngrx/store";
import {Total} from "./types";
import {IError} from "../../../api/api.generated";

export namespace ChartActions {
  export const GetTotal = createAction('[Chart] Get Total');
  export const GetTotalForMonth = createAction('[Chart] Get Total: Month');
  export const GetTotalForYear = createAction('[Chart] Get Total: Year');

  export const GetSuccessful = createAction(
    '[Chart] Get: Success',
    props<{
      total: Total
    }>());
  export const GetSuccessfulMonth = createAction(
    '[Chart] Get Month: Success',
    props<{
      total: Total
    }>());
  export const GetSuccessfulYear = createAction(
    '[Chart] Get Year: Success',
    props<{
      total: Total
    }>());
  export const GetFailed = createAction('[Chart] Get: Failed', props<IError>());
}
