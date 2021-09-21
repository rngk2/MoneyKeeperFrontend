import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import AppState from "../app.state";
import CategoriesState from "./categories.state";
import {AppFeatures} from "../app.features";
import {CategoryActions} from "./categories.actions";
import {Observable} from "rxjs";
import {CategoryOverview, CreateCategoryDto, UpdateCategoryDto} from "../../../api/api.generated";
import {Injectable} from "@angular/core";
import CategoryService from "../../services/category.service";

const categoryFeatureSelector = createFeatureSelector<AppState, CategoriesState>(AppFeatures.Categories);
const categorySelector = createSelector(
  categoryFeatureSelector,
  (state) => state.overview
);

@Injectable()
export default class CategoriesStore {
  constructor(private readonly store: Store<AppState>,
              private readonly categoryService: CategoryService) { }

  public get overview(): Observable<CategoryOverview[]> {
    return this.store.select(categorySelector);
  }

  public normalizeNameString(name: string): string {
    const sym0 = name.charAt(0);
    if (sym0 == sym0.toUpperCase())
      return name;
    return (sym0.toUpperCase() + name.substr(1, name.length - 1)).trim();
  }

  public fetchOverview(range: {from: number, to: number}): void {
    // fixme
    if (range.from === 0) {
      this.store.dispatch(CategoryActions.DropState());
    }
    this.store.dispatch(CategoryActions.GetOverview(range))
  }

  public getCategoriesNames(total: Record<string, number>): string[] {
    return this.categoryService.utils.getCategoriesNames(total);
  }

  public getAmountForCategories(total: Record<string, number>): number[] {
    return this.categoryService.utils.getAmountForCategories(total);
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
