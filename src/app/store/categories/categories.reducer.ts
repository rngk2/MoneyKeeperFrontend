import CategoriesState from "./categories.state";
import {Action, createReducer, on} from "@ngrx/store";
import {CategoryActions} from "./categories.actions";

const initialState: CategoriesState = {overview: []};
const _categoryReducer = createReducer(
  initialState,
  on(CategoryActions.GetOverview_Success, (state, updatedValue) => ({
    overview: state ? [...state.overview, ...updatedValue.data] : updatedValue.data
  }))
);

export const categoryReducer = (state: CategoriesState, action: Action) => _categoryReducer(state, action);
