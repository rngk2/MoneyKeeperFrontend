import {IError} from "../../../api/api.generated";
import {Summary} from "./types";

export default interface CardsState {
  cards?: Summary;
  error?: IError;
}
