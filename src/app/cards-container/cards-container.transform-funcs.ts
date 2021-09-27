import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const extractData = (observable: Observable<any>): Observable<any[] | undefined> => {
  return observable.pipe(map(value => value ? Object.values(value) : undefined));
};

export const extractNames = <T>(observable: Observable<T>): Observable<Array<keyof T> | undefined> => {
  return observable.pipe(map(value => value ? Object.keys(value) as Array<keyof T> : undefined));
};

