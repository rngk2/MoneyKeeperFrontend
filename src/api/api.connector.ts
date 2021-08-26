import {Api} from './api.generated';
import {Inject, Injectable} from "@angular/core";
import {BASE_SERVER_URL} from "../app/app.config";
import CurrentUserService from "../app/services/currentUser.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export default class ApiConnector {

  private _api = new BehaviorSubject(new Api())

  constructor(@Inject(BASE_SERVER_URL) private readonly baseUrl: string,
              private readonly currentUserService: CurrentUserService) {
    currentUserService.getCurrentUserAsObservable().subscribe(value => {
      const currentUser = value;
      const authToken = currentUser && currentUser.jwtToken;
      let authHeader = {};

      if (authToken) {
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
