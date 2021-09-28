import { createAction, props } from "@ngrx/store";

import {
  ApiContractCategory,
  ApiContractCategoryOverview,
  ApiContractCreateCategory,
  ApiContractIError,
  ApiContractUpdateCategory
} from "../../../api/api.generated";

export namespace CategoryActions {
  export const GetCategories = createAction(
    '[Category] Get All',
  );
  export const GetCategoriesSuccess = createAction(
    '[Category] Get All: Success',
    props<{
      categories: ApiContractCategory[]
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
      data: ApiContractCategoryOverview[]
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
      data: ApiContractCategoryOverview
    }>());
  export const GetOverviewForEarnings = createAction(
    '[Category] Get Overview For Earnings'
  );
  export const GetOverviewForEarningsSuccess = createAction(
    '[Category] Get Overview For Earnings: Success',
    props<{
      earningsOverview: ApiContractCategoryOverview
    }>()
  );
  export const CreateCategory = createAction(
    '[Category] Create',
    props<ApiContractCreateCategory>()
  );
  export const CreateCategorySuccess = createAction(
    '[Category] Create: Success',
    props<{
      created: ApiContractCategory
    }>()
  );
  export const UpdateCategory = createAction(
    '[Category] Update',
    props<{
      categoryId: number,
      data: ApiContractUpdateCategory
    }>()
  );
  export const UpdateCategorySuccess = createAction(
    '[Category] Update: Success',
    props<{
      updated: ApiContractCategory
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
      deleted: ApiContractCategory
    }>()
  );
  export const OperationFailed = createAction(
    '[Category] Operation Failed',
    props<ApiContractIError>()
  );
  export const DropOverviewState = createAction(
    '[Category] Drop Overview State',
  );
}


