import { createAction, props } from "@ngrx/store";

import { ApiContractCreateUser, ApiContractIError } from "../../../api/api.generated";
import IUser from "../../entities/user.entity";

export namespace AuthActions {
  export const LogIn = createAction(
    '[Auth] Login',
    props<{ email: string, password: string }>()
  );
  export const LogInSuccess = createAction(
    '[Auth] Login Success',
    props<IUser>()
  );
  export const LogInFailure = createAction(
    '[Auth] Login Failure',
    props<ApiContractIError>()
  );
  export const LogOut = createAction(
    '[Auth] Logout'
  );
  export const SignUp = createAction(
    '[Auth] Signup',
    props<ApiContractCreateUser>()
  );
  export const SignUpSuccess = createAction(
    '[Auth] Signup Success',
    props<IUser>()
  );
  export const SignUpFailure = createAction(
    '[Auth] Signup Failure',
    props<ApiContractIError>()
  );
}

