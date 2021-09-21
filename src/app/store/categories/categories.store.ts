import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CategoryOverview, CreateCategoryDto, UpdateCategoryDto } from "../../../api/api.generated";
import { AppFeatures } from "../app.features";
import AppState from "../app.state";
import { CategoryActions } from "./categories.actions";
import CategoriesState from "./categories.state";

const categoryFeatureSelector = createFeatureSelector<AppState, CategoriesState>(AppFeatures.Categories);
const categorySelector = createSelector(
  categoryFeatureSelector,
  (state) => state.overview
);

@Injectable()
export default class CategoriesStore {

  constructor(
    private readonly store: Store<AppState>
  ) {
  }

  public get overview(): Observable<CategoryOverview[]> {
    return this.store.select(categorySelector);
  }

  public fetchOverview(range: { from: number, to: number }): void {
    // fixme
    if (range.from === 0) {
      this.store.dispatch(CategoryActions.DropState());
    }
    this.store.dispatch(CategoryActions.GetOverview(range));
  }

  public createCategory(category: CreateCategoryDto): void {
    this.store.dispatch(CategoryActions.CreateCategory(category));
  }

  public updateCategory(data: {
    categoryId: number,
    data: UpdateCategoryDto
  }): void {
    this.store.dispatch(CategoryActions.UpdateCategory(data));
  }

  public deleteCategory(categoryIdOrName: number | string): void {
    this.store.dispatch(CategoryActions.DeleteCategory({
      idOrName: categoryIdOrName
    }));
  }
}
