import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "reduce" })
export class ReducePipe implements PipeTransform {
  public transform<T>(array: T[], reducer: (acc: T, curr: T) => T): T {
    if (!array || array.length < 1) {
      return null as unknown as T;
    }
    else if (array.length === 1) {
      return array[0];
    }
    return array.reduce(reducer);
  }
}
