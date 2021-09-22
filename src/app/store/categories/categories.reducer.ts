import { Action, createReducer, on } from "@ngrx/store";

import { CategoryActions } from "./categories.actions";
import CategoriesState from "./categories.state";

const initialState: CategoriesState = { overview: [] };
const _categoryReducer = createReducer(
  initialState,
  on(CategoryActions.DropState, () => ({
    overview: []
  })),
  on(CategoryActions.GetOverviewSuccess, (state, updatedValue) => ({
    overview: Object.values(state ? [...state.overview, ...updatedValue.data] : updatedValue.data)
  })),
  on(CategoryActions.GetOverviewForCategorySuccess, (state, updatedValue) => {
    const elementInOverviewIndex = state.overview.findIndex(value =>
      updatedValue.data.categoryId === value.categoryId
    );
    if (elementInOverviewIndex === -1) {
      return {
        overview: [...(state ? state.overview : []), updatedValue.data]
      };
    }

    const updatedState = Object.assign({}, state.overview);
    updatedState[elementInOverviewIndex] = updatedValue.data;

    return {
      overview: Object.values(updatedState)
    };
  }),
  on(CategoryActions.CreateCategorySuccess, (state, { created }) => {
    return {
      overview: [...(state ? state.overview : []), {
        categoryName: created.name,
        categoryId: created.id,
        spentThisMonth: 0
      }]
    };
  }),
  on(CategoryActions.UpdateCategorySuccess, (state, { updated }) => {
    const updatedState = Object.assign({}, state.overview);
    const updatedIndex = state.overview.findIndex(value => value.categoryId === updated.id);
    updatedState[updatedIndex] = {
      categoryName: updated.name,
      categoryId: updated.id,
      spentThisMonth: state.overview[updatedIndex].spentThisMonth
    };
    return ({
      overview: Object.values(updatedState)
    });
  }),
  on(CategoryActions.DeleteCategorySuccess, (state, { deleted }) => ({
    overview: state.overview.filter(value => value.categoryId !== deleted.id)
  }))
);

export const categoryReducer = (state: CategoriesState, action: Action) => _categoryReducer(state, action);
