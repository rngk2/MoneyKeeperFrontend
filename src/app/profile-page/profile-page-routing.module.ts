import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfilePageComponent} from "./profile-page.component";
import {CanActivateUserRoutes, Permissions} from "../guards";

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canActivate: [CanActivateUserRoutes]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CanActivateUserRoutes,
    Permissions
  ]
})
export class ProfilePageRoutingModule { }
