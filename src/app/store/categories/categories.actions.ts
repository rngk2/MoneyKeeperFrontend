import { createAction, props } from "@ngrx/store";

import {
  CategoryDto,
  CategoryOverview,
  CreateCategoryDto,
  IError,
  UpdateCategoryDto
} from "../../../api/api.generated";

export namespace CategoryActions {
  export const GetCategories = createAction(
    '[Category] Get All',
  );
  export const GetCategoriesSuccess = createAction(
    '[Category] Get All: Success',
    props<{
      categories: CategoryDto[]
    }>()
  );
  export const GetOverview = createAction(
    '[Category] Get Overview',
    props<{
      from: number,
      to: number
    }>()
  );
  export const GetOverviewSuccess = createAction(
    '[Category] Get Overview: Success',
    props<{
      data: CategoryOverview[]
    }>());
  export const GetOverviewForCategory = createAction(
    '[Category] Get Overview For Category',
    props<{
      categoryId: number
    }>()
  );
  export const GetOverviewForCategorySuccess = createAction(
    '[Category] Get Overview For Category: Success',
    props<{
      data: CategoryOverview
    }>());
  export const GetOverviewForEarnings = createAction(
    '[Category] Get Overview For Earnings'
  );
  export const GetOverviewForEarningsSuccess = createAction(
    '[Category] Get Overview For Earnings: Success',
    props<{
      earningsOverview: CategoryOverview
    }>()
  );
  export const CreateCategory = createAction(
    '[Category] Create',
    props<CreateCategoryDto>()
  );
  export const CreateCategorySuccess = createAction(
    '[Category] Create: Success',
    props<{
      created: CategoryDto
    }>()
  );
  export const UpdateCategory = createAction(
    '[Category] Update',
    props<{
      categoryId: number,
      data: UpdateCategoryDto
    }>()
  );
  export const UpdateCategorySuccess = createAction(
    '[Category] Update: Success',
    props<{
      updated: CategoryDto
    }>()
  );
  export const DeleteCategory = createAction(
    '[Category] Delete',
    props<{
      idOrName: number | string
    }>()
  );
  export const DeleteCategorySuccess = createAction(
    '[Category] Delete: Success',
    props<{
      deleted: CategoryDto
    }>()
  );
  export const OperationFailed = createAction(
    '[Category] Operation Failed',
    props<IError>()
  );
  export const DropOverviewState = createAction(
    '[Category] Drop Overview State',
  );
}


