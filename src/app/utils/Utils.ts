import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

export interface Range {
  readonly begin: number;
  readonly end: number;
}

export type ReplaceReturnType<T extends (...a: any[]) => any, R> = (...a: Parameters<T>) => R

export type Observed<T> = {
  [P in keyof T]: T[P] extends (...a: any[]) => any ? ReplaceReturnType<T[P], Observable<any>> : unknown;
}

export const convertToObserved = <T>(value: T): Observed<T> => {
  let result: any = {};

  for (const key in value) {
    const member = value[key];
    if (member instanceof Function) {
      let f: Function = member as unknown as (...args: any[]) => any;
      result[key] = (...args: any[]) => fromPromise(f(...args))
    }
  }

  return result as Observed<T>;
}
