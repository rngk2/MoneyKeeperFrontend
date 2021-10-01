import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
  public transform<T>(array: T[], compareFn: (a: unknown, b: unknown) => number): T[] {
    const newArray = Object.isFrozen(array) ? Object.values(array) : array;
    newArray.sort(compareFn);
    return newArray;
  }
}
