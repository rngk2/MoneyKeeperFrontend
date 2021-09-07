import AbstractStore from "../AbstractStore";
import {Store} from "@ngrx/store";

export default class UserStore extends AbstractStore {
  constructor(store: Store<any>) {
    super(store, 'auth')
  }
}
