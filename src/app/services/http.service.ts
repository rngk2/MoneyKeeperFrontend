import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export default class HttpService {

  constructor(private http: HttpClient) {
  }

  post<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data)
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url)
  }

}

