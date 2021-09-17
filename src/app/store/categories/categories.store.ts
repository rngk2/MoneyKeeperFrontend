import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import AppState from "../app.state";
import CategoriesState from "./categories.state";
import {AppFeatures} from "../app.features";
import {CategoryActions} from "./categories.actions";
import {Observable} from "rxjs";
import {CategoryOverview} from "../../../api/api.generated";
import {Injectable} from "@angular/core";
import CategoryService from "../../services/category.service";

const categoryFeatureSelector = createFeatureSelector<AppState, CategoriesState>(AppFeatures.Categories);
const categorySelector = createSelector(
  categoryFeatureSelector,
  (state) => state.overview
)

@Injectable()
export default class CategoriesStore {
  constructor(private readonly store: Store<AppState>,
              private readonly categoryService: CategoryService) { }

  public get overview(): Observable<CategoryOverview[]> {
    return this.store.select(categorySelector);
  }

  public fetchOverview(range: {from: number, to: number}): void {
    this.store.dispatch(CategoryActions.GetOverview(range))
  }

  public getCategoriesNames(total: Record<string, number>): string[] {
    return this.categoryService.utils.getCategoriesNames(total);
  }

  public getAmountForCategories(total: Record<string, number>): number[] {
    return this.categoryService.utils.getAmountForCategories(total);
  }
}
