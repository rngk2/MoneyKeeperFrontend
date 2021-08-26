import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

export interface Range {
  readonly begin: number;
  readonly end: number;
}

export type ReplaceReturnType<T extends (...a: any[]) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn

export type Observed<T> = {
  [P in keyof T]: T[P] extends (...a: any[]) => any ? ReplaceReturnType<T[P], Observable<any>> : unknown;
}

export const convertToObserved = <T>(value: T): Observed<T> => {
  let result : any = {};

  for (const key in value) {
    const func = value[key] as unknown as (...args: any[]) => any;
    if (func instanceof Function) {
      result[key] = (...args: any[]) => fromPromise(func(...args))
    }
  }

  return result as Observed<T>;
}
