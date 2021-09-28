import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import CategoryService from "../../services/category.service";
import { CategoryActions } from './categories.actions';
import CategoriesStore from "./categories.store";

@Injectable()
export class CategoryEffects {
  public readonly getCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.GetCategories),
      withLatestFrom(this.categoriesStore.categories),
      switchMap(([, categories]) => {
        if (categories && categories.length > 0) {
          return of(categories).pipe(map(value => CategoryActions.GetCategoriesSuccess({ categories: value })));
        }
        return this.categoryService.api.categoriesList()
          .pipe(map(res => !res.data.error
            ? CategoryActions.GetCategoriesSuccess({ categories: res.data.value })
            : CategoryActions.OperationFailed(res.data.error)
          ));
      })
    )
  );
  public readonly getOverview = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.GetOverview),
      switchMap(payload => {
          return this.categoryService.api.overviewList(payload)
            .pipe(map(res => !res.data.error
                ? CategoryActions.GetOverviewSuccess({ data: res.data.value })
                : CategoryActions.OperationFailed(res.data.error)
              )
            );
        }
      )
    )
  );
  public readonly getOverviewForCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.GetOverviewForCategory),
      switchMap(payload => this.categoryService.api.overviewDetail(payload.categoryId)
        .pipe(map(res => !res.data.error
            ? CategoryActions.GetOverviewForCategorySuccess({ data: res.data.value })
            : CategoryActions.OperationFailed(res.data.error)
          )
        )
      )
    )
  );
  public readonly getOverviewForEarnings = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.GetOverviewForEarnings),
      switchMap(() => this.categoryService.api.earningsOverviewList()
        .pipe(map(res => !res.data.error
            ? CategoryActions.GetOverviewForEarningsSuccess({ earningsOverview: res.data.value })
            : CategoryActions.OperationFailed(res.data.error)
          )
        )
      )
    )
  );
  public readonly createCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.CreateCategory),
      switchMap(payload => this.categoryService.api.categoriesCreate(payload)
        .pipe(map(res => !res.data.error
          ? CategoryActions.CreateCategorySuccess({ created: res.data.value })
          : CategoryActions.OperationFailed(res.data.error)
        ))
      )
    )
  );
  public readonly updateCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.UpdateCategory),
      switchMap(payload => this.categoryService.api.categoriesUpdate(payload.categoryId, payload.data).pipe(map(res => !res.data.error
          ? CategoryActions.UpdateCategorySuccess({ updated: res.data.value })
          : CategoryActions.OperationFailed(res.data.error)
        ))
      )
    )
  );
  public readonly deleteCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.DeleteCategory),
      switchMap(payload => {
        if (typeof payload.idOrName === 'number') {
          return this.categoryService.api.categoriesDelete(payload.idOrName)
            .pipe(map(res => !res.data.error
              ? CategoryActions.DeleteCategorySuccess({ deleted: res.data.value })
              : CategoryActions.OperationFailed(res.data.error)));
        }
        return this.categoryService.api.categoriesDelete2({ categoryName: payload.idOrName })
          .pipe(map(res => !res.data.error
            ? CategoryActions.DeleteCategorySuccess({ deleted: res.data.value })
            : CategoryActions.OperationFailed(res.data.error)));
      })
    )
  );
  public readonly operationFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.OperationFailed),
      tap(error => console.error(error))
    ), { dispatch: true }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly categoryService: CategoryService,
    private readonly categoriesStore: CategoriesStore
  ) {
  }
}
