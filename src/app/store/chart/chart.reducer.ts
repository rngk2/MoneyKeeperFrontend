import { Action, createReducer, on } from "@ngrx/store";
import { ChartActions } from "./chart.actions";
import ChartState from "./chart.state";

const initialState: ChartState = {};
const _chartReducer = createReducer(
  initialState,
  on(ChartActions.GetTotalSuccess, (state, updatedValue) => {
    return {
      total: updatedValue.total
    };
  }),
  on(ChartActions.GetTotalForMonthSuccess, (state, updatedValue) => ({
    totalMonth: updatedValue.total
  })),
  on(ChartActions.GetTotalForYearSuccess, (state, updatedValue) => ({
    totalYear: updatedValue.total
  }))
);

export const chartReducer = (state: ChartState, action: Action) => _chartReducer(state, action);
