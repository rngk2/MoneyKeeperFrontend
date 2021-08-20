import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import UserService from "./user.service";

class ApiEndpoints {
  CREATE_USER = () => '/users'
  GET_USER = (id: number) => `/users/${id}`
}

@Injectable()
export default class HttpService {

  constructor(private readonly http: HttpClient,
              private readonly userService: UserService) {
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data)
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url)
  }
}

