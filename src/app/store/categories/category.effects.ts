import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CategoryActions} from './categories.actions';
import {map, switchMap, tap} from "rxjs/operators";
import CategoryService from "../../services/category.service";
import CardsStore from "../cards/cards.store";

@Injectable()
export class CategoryEffects {
  constructor(private readonly actions$: Actions,
              private readonly categoryService: CategoryService,
              private readonly cardsStore: CardsStore) {
  }

  public readonly categoryOperation = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CategoryActions.CreateCategory,
        CategoryActions.UpdateCategory,
        CategoryActions.DeleteCategory
      ),
      switchMap(payload => this.categoryService.api.categoriesCreate(payload)
        .pipe(map(res => !res.data.error
          ? CategoryActions.OperationSuccessful(res.data.value)
          : CategoryActions.OperationFailed(res.data.error)
        ))
      )
    )
  );

  public readonly operationSuccessful = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.OperationSuccessful),
      tap(() => this.cardsStore.updateState())
    )
  );

  public readonly operationFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.OperationFailed),
      tap(error => console.error(error))
    )
  );
}
