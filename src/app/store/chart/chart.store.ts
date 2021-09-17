import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import AppState from "../app.state";
import ChartState from "./chart.state";
import {AppFeatures} from "../app.features";
import {Injectable} from "@angular/core";
import {ChartActions} from "./chart.actions";
import {Observable} from "rxjs";
import {Total} from "./types";
import {skip} from "rxjs/operators";

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

@Injectable()
export default class ChartStore {
  constructor(private readonly store: Store<AppState>) { }

  public get total(): Observable<Total | undefined> {
    return this.store.select(chartSelectTotal);
  }

  public get totalMonth(): Observable<Total | undefined> {
    return this.store.select(chartSelectTotalMonth).pipe(skip(0));
  }

  public get totalYear(): Observable<Total | undefined> {
    return this.store.select(chartSelectTotalYear).pipe(skip(0));
  }

  public fetchTotal(): void {
    this.store.dispatch(ChartActions.GetTotal());
  }

  public fetchTotalForMonth(): void {
    this.store.dispatch(ChartActions.GetTotalForMonth());
  }

  public fetchTotalForYear(): void {
    this.store.dispatch(ChartActions.GetTotalForYear());
  }
}
