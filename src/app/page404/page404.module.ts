import {NgModule} from "@angular/core";
import {Page404Component} from "./page404.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Page404RoutingModule} from "./page404-routing.module";

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
export class Page404Module {}
