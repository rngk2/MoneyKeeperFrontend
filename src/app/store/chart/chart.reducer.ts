import ChartState from "./chart.state";
import {Action, createReducer, on} from "@ngrx/store";
import {ChartActions} from "./chart.actions";

const initialState: ChartState = { }
const _chartReducer = createReducer(
  initialState,
  on(ChartActions.GetSuccessful, (state, updatedValue) => {
    return {
      total: updatedValue.total
    }
  }),
  on(ChartActions.GetSuccessfulMonth, (state, updatedValue) => ({
    totalMonth: updatedValue.total
  })),
  on(ChartActions.GetSuccessfulYear, (state, updatedValue) => ({
    totalYear: updatedValue.total
  }))
);

export const chartReducer = (state: ChartState, action: Action) => _chartReducer(state, action);
