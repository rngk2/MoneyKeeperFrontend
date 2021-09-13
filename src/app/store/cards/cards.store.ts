import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import AppState from "../app.state";
import CardsState from "./cards.state";
import {Summary} from "./types";
import {CardsActions} from "./cards.actions";
import {Observable} from "rxjs";
import CacheService from "../../services/cache.service";
import {AppFeatures} from "../app.features";

const selectCardsFeature = createFeatureSelector<AppState, CardsState>(AppFeatures.Cards);
const cardsSelector = createSelector(
  selectCardsFeature,
  (state) => state.cards
);

@Injectable()
export default class CardsStore {

  constructor(private readonly store: Store<AppState>,
              private readonly cache: CacheService) { }

  public getSummary(): Observable<Summary | undefined> {
    return this.store.select(cardsSelector);
  }

  public emit(): void {
    this.store.dispatch(CardsActions.FetchFromCache());
  }

  public updateState(): void {
    this.store.dispatch(CardsActions.FetchSummary());
  }
}


