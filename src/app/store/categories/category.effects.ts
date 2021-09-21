import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CategoryActions} from './categories.actions';
import {map, switchMap, tap} from "rxjs/operators";
import CategoryService from "../../services/category.service";

@Injectable()
export class CategoryEffects {
  constructor(private readonly actions$: Actions,
              private readonly categoryService: CategoryService) {
  }

  public readonly getOverview = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.GetOverview),
      switchMap(payload => this.categoryService.api.overviewList(payload)
        .pipe(map(res => !res.data.error
          ? CategoryActions.GetOverviewSuccess({data: res.data.value})
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
      switchMap(payload => this.categoryService.api.categoriesUpdate(payload.data, {
        categoryId: payload.categoryId
      }).pipe(map(res => !res.data.error
          ? CategoryActions.UpdateCategorySuccess({ updated: res.data.value })
          : CategoryActions.OperationFailed(res.data.error)
        ))
      )
    )
  )

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
        return this.categoryService.api.byNameDelete(payload.idOrName)
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
    ), {dispatch: true}
  );
}
