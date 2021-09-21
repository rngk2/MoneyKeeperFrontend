import { createAction, props } from "@ngrx/store";

import { IError } from "../../../api/api.generated";
import { Total } from "./types";

export namespace ChartActions {
  export const GetTotal = createAction('[Chart] Get Total');
  export const GetTotalSuccess = createAction(
    '[Chart] Get: Success',
    props<{
      total: Total
    }>());
  export const GetTotalForMonth = createAction('[Chart] Get Total: Month');
  export const GetTotalForMonthSuccess = createAction(
    '[Chart] Get Month: Success',
    props<{
      total: Total
    }>());
  export const GetTotalForYear = createAction('[Chart] Get Total: Year');
  export const GetTotalForYearSuccess = createAction(
    '[Chart] Get Year: Success',
    props<{
      total: Total
    }>());
  export const OperationFailed = createAction(
    '[Chart] Operation Failed',
    props<IError>()
  );
}
