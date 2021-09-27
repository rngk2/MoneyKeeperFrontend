import { Action, createReducer, on } from "@ngrx/store";
import ICategory from "../../entities/category.entity";

import { CategoryActions } from "./categories.actions";
import CategoriesState from "./categories.state";

const initialState: CategoriesState = {
  categories: [],
  overview: [],
};
const _categoryReducer = createReducer(
  initialState,
  on(CategoryActions.DropOverviewState, (state) => ({
    ...state,
    overview: []
  })),
  on(CategoryActions.GetCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories as ICategory[]
  })),
  on(CategoryActions.GetOverviewSuccess, (state, updatedValue) => ({
    ...state,
    overview: Object.values(state ? [...state.overview, ...updatedValue.data] : updatedValue.data)
  })),
  on(CategoryActions.GetOverviewForCategorySuccess, (state, updatedValue) => {
    const elementInOverviewIndex = state.overview.findIndex(value =>
      updatedValue.data.categoryId === value.categoryId
    );
    if (elementInOverviewIndex === -1) {
      return {
        ...state,
        overview: [...(state ? state.overview : []), updatedValue.data]
      };
    }

    const updatedState = Object.assign({}, state.overview);
    updatedState[elementInOverviewIndex] = updatedValue.data;

    return {
      ...state,
      overview: Object.values(updatedState)
    };
  }),
  on(CategoryActions.GetOverviewForEarningsSuccess, (state, { earningsOverview }) => ({
    ...state,
    earningsOverview
  })),
  on(CategoryActions.CreateCategorySuccess, (state, { created }) => {
    return {
      ...state,
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
      ...state,
      overview: Object.values(updatedState)
    });
  }),
  on(CategoryActions.DeleteCategorySuccess, (state, { deleted }) => ({
    ...state,
    overview: state.overview.filter(value => value.categoryId !== deleted.id)
  }))
);

export const categoryReducer = (state: CategoriesState, action: Action) => _categoryReducer(state, action);
