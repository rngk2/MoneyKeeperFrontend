import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import {
  ApiContractCategoryOverview,
  ApiContractCreateCategory,
  ApiContractUpdateCategory
} from "../../../api/api.generated";
import ICategory from "../../entities/category.entity";
import { INPUT_TRANSACTION_NAME } from "../../entities/transaction.entity";
import { AppFeatures } from "../app.features";
import AppState from "../app.state";
import { CategoryActions } from "./categories.actions";
import CategoriesState from "./categories.state";

const categoryFeatureSelector = createFeatureSelector<AppState, CategoriesState>(AppFeatures.Categories);
const overviewSelector = createSelector(
  categoryFeatureSelector,
  (state) => state.overview
);
const categoriesSelector = createSelector(
  categoryFeatureSelector,
  (state) => state.categories
);
const earningsOverviewSelector = createSelector(
  categoryFeatureSelector,
  (state) => state.earningsOverview
);

@Injectable()
export default class CategoriesStore {

  constructor(
    private readonly store: Store<AppState>
  ) {
  }

  public get categories(): Observable<ICategory[]> {
    return this.store.select(categoriesSelector);
  }

  public get earnings(): Observable<ICategory | undefined> {
    const selectEarnings = createSelector(
      categoryFeatureSelector,
      ({ categories }) => {
        const index = categories.findIndex((value: { name: string }) => value.name === INPUT_TRANSACTION_NAME);
        if (index === -1) {
          return undefined;
        }
        return categories[index];
      }
    );
    return this.store.select(selectEarnings);
  }

  public get overview(): Observable<ApiContractCategoryOverview[]> {
    return this.store.select(overviewSelector);
  }

  public get earningsOverview(): Observable<ApiContractCategoryOverview | undefined> {
    return this.store.select(earningsOverviewSelector);
  }

  public fetchCategories(): void {
    this.store.dispatch(CategoryActions.GetCategories());
  }

  public fetchOverview(range: { from: number, to: number }): void {
    // fixme
    if (range.from === 0) {
      this.store.dispatch(CategoryActions.DropOverviewState());
    }
    this.store.dispatch(CategoryActions.GetOverview(range));
  }

  public fetchOverviewForCategory(categoryId: number): void {
    this.store.dispatch(CategoryActions.GetOverviewForCategory({ categoryId }));
  }

  public fetchOverviewForEarnings(): void {
    this.store.dispatch(CategoryActions.GetOverviewForEarnings());
  }

  public createCategory(category: ApiContractCreateCategory): void {
    this.store.dispatch(CategoryActions.CreateCategory(category));
  }

  public updateCategory(data: {
    categoryId: number,
    data: ApiContractUpdateCategory
  }): void {
    this.store.dispatch(CategoryActions.UpdateCategory(data));
  }

  public deleteCategory(categoryIdOrName: number | string): void {
    this.store.dispatch(CategoryActions.DeleteCategory({
      idOrName: categoryIdOrName
    }));
  }
}
