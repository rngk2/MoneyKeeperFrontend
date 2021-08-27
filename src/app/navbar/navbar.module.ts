import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {}
