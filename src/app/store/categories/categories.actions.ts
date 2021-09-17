import {createAction, props} from "@ngrx/store";
import {CategoryDto, CategoryOverview, CreateCategoryDto, IError, UpdateCategoryDto} from "../../../api/api.generated";

export namespace CategoryActions {
  export const GetOverview = createAction(
    '[Category] Get Overview',
    props<{
      from: number,
      to: number
    }>()
  );
  export const GetOverview_Success = createAction(
    '[Category] Get Overview : Success',
    props<{
      data: CategoryOverview[]
    }>());
  export const CreateCategory = createAction('[Category] Create', props<CreateCategoryDto>());
  export const UpdateCategory = createAction('[Category] Update', props<UpdateCategoryDto>());
  export const DeleteCategory = createAction('[Category] Delete',
    props<{
    idOrName: number | string
    }>()
  );
  export const OperationSuccessful = createAction('[Category] Operation Successful', props<CategoryDto>());
  export const OperationFailed = createAction('[Category] Operation Failed', props<IError>());
}


