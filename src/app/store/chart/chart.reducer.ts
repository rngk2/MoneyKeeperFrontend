import { Action, createReducer, on } from "@ngrx/store";
import { ChartActions } from "./chart.actions";
import ChartState from "./chart.state";

const initialState: ChartState = {};
const _chartReducer = createReducer(
  initialState,
  on(ChartActions.GetTotalSuccess, (state, updatedValue) => ({
    ...state,
    total: updatedValue.total,
  })),
  on(ChartActions.GetTotalForMonthSuccess, (state, updatedValue) => ({
    ...state,
    totalMonth: updatedValue.total
  })),
  on(ChartActions.GetTotalForYearSuccess, (state, updatedValue) => ({
    ...state,
    totalYear: updatedValue.total
  }))
);

export const chartReducer = (state: ChartState, action: Action) => _chartReducer(state, action);
