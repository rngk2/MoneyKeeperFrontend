import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'transform' })
export class TransformPipe implements PipeTransform {
  public transform<TObject, TTransformed>(obj: TObject, transformFn: (obj: TObject) => TTransformed): TTransformed {
    return transformFn(obj);
  }
}
