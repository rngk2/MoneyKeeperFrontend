import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  public transform<T>(array: T[] | null, predicate: (element: T) => boolean): T[] {
    return !array || array.length < 1 ? [] : array.filter(predicate);
  }
}
