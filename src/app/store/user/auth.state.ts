import { ApiContractIError } from "../../../api/api.generated";
import IUser from "../../entities/user.entity";

export default interface AuthState {
  user?: IUser;
  error?: ApiContractIError;
}
