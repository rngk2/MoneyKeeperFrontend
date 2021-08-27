import {NgModule} from "@angular/core";
import {ProfilePageComponent} from "./profile-page.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ProfilePageRoutingModule} from "./profile-page-routing.module";
import {WalletChartModule} from "../wallet-chart/wallet-chart.module";


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    ProfilePageRoutingModule,
    CommonModule,
    RouterModule,
    WalletChartModule
  ]
})
export class ProfilePageModule { }
