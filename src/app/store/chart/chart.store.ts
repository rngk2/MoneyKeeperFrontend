import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { sum } from "../../utils";

import { AppFeatures } from "../app.features";
import AppState from "../app.state";
import { ChartActions } from "./chart.actions";
import ChartState from "./chart.state";
import { Total } from "./types";

const selectChartFeature = createFeatureSelector<AppState, ChartState>(AppFeatures.Chart);
const chartSelectTotal = createSelector(
  selectChartFeature,
  (state) => state.total
);
const chartSelectTotalMonth = createSelector(
  selectChartFeature,
  (state) => state.totalMonth
);
const chartSelectTotalYear = createSelector(
  selectChartFeature,
  (state) => state.totalYear
);
const chartSelectAmountMonth = createSelector(
  selectChartFeature,
  (state) => sum(state.totalMonth ? Object.values(state.totalMonth) : [])
);
const chartSelectAmountYear = createSelector(
  selectChartFeature,
  (state) => sum(state.totalYear ? Object.values(state.totalYear) : [])
);

@Injectable()
export default class ChartStore {
  constructor(private readonly store: Store<AppState>) {
  }

  public get total(): Observable<Total | undefined> {
    return this.store.select(chartSelectTotal);
  }

  public get totalMonth(): Observable<Total | undefined> {
    return this.store.select(chartSelectTotalMonth);
  }

  public get totalYear(): Observable<Total | undefined> {
    return this.store.select(chartSelectTotalYear);
  }

  public get amountMonth(): Observable<number> {
    return this.store.select(chartSelectAmountMonth);
  }

  public get amountYear(): Observable<number> {
    return this.store.select(chartSelectAmountYear);
  }

  public fetchTotal(): void {
    this.store.dispatch(ChartActions.GetTotal({ checkIfCached: true }));
  }

  public fetchTotalForMonth(): void {
    this.store.dispatch(ChartActions.GetTotalForMonth({ checkIfCached: true }));
  }

  public fetchTotalForYear(): void {
    this.store.dispatch(ChartActions.GetTotalForYear({ checkIfCached: true }));
  }

  public fetchAll(): void {
    this.store.dispatch(ChartActions.GetTotal({ checkIfCached: false }));
    this.store.dispatch(ChartActions.GetTotalForMonth({ checkIfCached: false }));
    this.store.dispatch(ChartActions.GetTotalForYear({ checkIfCached: false }));
  }
}
