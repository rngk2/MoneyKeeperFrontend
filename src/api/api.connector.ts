import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BASE_SERVER_URL } from "../app/app.config";
import UserStore from "../app/store/user/user.store";
import { Api } from './api.generated';

@Injectable()
export default class ApiConnector {

  private _api = new BehaviorSubject(new Api());

  constructor(
    @Inject(BASE_SERVER_URL) private readonly baseUrl: string,
    private readonly userStore: UserStore
  ) {
    userStore.getUser().subscribe(value => {
      console.log('1');
      console.log(value);
      const currentUser = value;
      const authToken = currentUser && currentUser.jwtToken;
      let authHeader = {};

      if (authToken) {
        console.log(authToken, typeof authToken);
        authHeader = {
          'Authorization': 'Bearer ' + authToken
        };
      }

      this._api.next(new Api({
        baseUrl: baseUrl,
        baseApiParams: {
          credentials: 'include',
          headers: {
            ...(authHeader)
          }
        }
      }));
    });
  }

  public get api(): Observable<Api<any>> {
    return this._api.asObservable();
  }
}
