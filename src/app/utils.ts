import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

export class ArgumentError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export interface Range {
  readonly begin: number;
  readonly end: number;
}

export class RangeOffsetController {
  constructor(
    private beginOffset: number,
    private readonly step: number
  ) {
  }

  public getNextRange(): Range {
    const begin = this.beginOffset;
    const end = begin + this.step;
    this.beginOffset += this.step + 1;

    return { begin, end };
  }
}

export type ReplaceReturnType<T extends (...a: any[]) => any, R> = (...a: Parameters<T>) => R;

export type Observed<T> = {
  [P in keyof T]: T[P] extends (...a: any[]) => any ? ReplaceReturnType<T[P], Observable<any>> : unknown;
};

export const convertToObserved = <T>(value: T): Observed<T> => {
  let result: any = {};
  for (const key in value) {
    const member = value[key];
    if (member instanceof Function) {
      let f: Function = member as unknown as (...args: any[]) => any;
      result[key] = (...args: any[]) => fromPromise(f(...args));
    }
  }
  return result as Observed<T>;
};

export const compareFn = <T>(compareBy: keyof T) => (a: T, b: T) => {
  if (!a[compareBy] || !b[compareBy]) {
    return 0;
  }
  else if (a[compareBy] < b[compareBy]) {
    return -1;
  }
  else if (a[compareBy] > b[compareBy]) {
    return 1;
  }
  return 0;
};

export const sum = (array: number[]): number => {
  if (array.length < 1) {
    return 0;
  }
  else if (array.length === 1) {
    return array[0];
  }
  return array.reduce((acc, curr) => acc + curr);
};
