import { NgModule } from "@angular/core";

import { FilterPipe } from "./filter.pipe";
import { ReducePipe } from "./reduce.pipe";
import { SortPipe } from "./sort.pipe";
import { TransformPipe } from "./transform.pipe";

@NgModule({
  declarations: [
    SortPipe,
    FilterPipe,
    TransformPipe,
    ReducePipe
  ],
  imports: [],
  exports: [
    SortPipe,
    FilterPipe,
    TransformPipe,
    ReducePipe
  ]
})
export class PipesModule {
}
