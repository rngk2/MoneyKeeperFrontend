import User from "../../entities/user.entity";
import {IError} from "../../../api/api.generated";

export default interface AuthState {
  user?: User;
  error?: IError;
}
