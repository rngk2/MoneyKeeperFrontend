import CategoriesState from "./categories.state";
import {Action, createReducer, on} from "@ngrx/store";
import {CategoryActions} from "./categories.actions";

const initialState: CategoriesState = {overview: []};
const _categoryReducer = createReducer(
  initialState,
  on(CategoryActions.DropState, () => ({
    overview: []
  })),
  on(CategoryActions.GetOverviewSuccess, (state, updatedValue) => ({
    overview: state ? [...state.overview, ...updatedValue.data] : updatedValue.data
  })),
  on(CategoryActions.CreateCategorySuccess, (state, {created}) => {
    return {
      overview: [...(state ? state.overview : []), {
        categoryName: created.name,
        categoryId: created.id,
        spentThisMonth: 0
      }]
    }
  }),
  on(CategoryActions.UpdateCategorySuccess, (state, {updated}) => {
    const updatedState = state.overview;
    updatedState[
      state.overview.findIndex(value => value.categoryId === updated.id)
      ].categoryName = updated.name;
    return ({
      overview: updatedState
    })
  }),
  on(CategoryActions.DeleteCategorySuccess, (state, {deleted}) => ({
    overview: state.overview.filter(value => value.categoryId !== deleted.id)
  }))
);

export const categoryReducer = (state: CategoriesState, action: Action) => _categoryReducer(state, action);
