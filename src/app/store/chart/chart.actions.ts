import { createAction, props } from "@ngrx/store";

import { ApiContractIError } from "../../../api/api.generated";
import { Total } from "./types";

export namespace ChartActions {
  export const GetTotal = createAction(
    '[Chart] Get Total',
    props<{
      checkIfCached: boolean
    }>()
  );
  export const GetTotalSuccess = createAction(
    '[Chart] Get: Success',
    props<{
      total: Total,

    }>());
  export const GetTotalForMonth = createAction(
    '[Chart] Get Total: Month',
    props<{
      checkIfCached: boolean
    }>());
  export const GetTotalForMonthSuccess = createAction(
    '[Chart] Get Month: Success',
    props<{
      total: Total
    }>());
  export const GetTotalForYear = createAction(
    '[Chart] Get Total: Year',
    props<{
      checkIfCached: boolean
    }>());
  export const GetTotalForYearSuccess = createAction(
    '[Chart] Get Year: Success',
    props<{
      total: Total
    }>());
  export const OperationFailed = createAction(
    '[Chart] Operation Failed',
    props<ApiContractIError>()
  );
}
