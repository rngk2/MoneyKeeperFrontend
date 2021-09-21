import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { Page404RoutingModule } from "./page404-routing.module";
import { Page404Component } from "./page404.component";

@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    Page404RoutingModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    Page404Component
  ]
})
export class Page404Module {
}
