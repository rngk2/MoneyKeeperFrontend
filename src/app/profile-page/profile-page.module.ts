import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PipesModule } from "../commons/pipes/pipes.module";

import { WalletChartModule } from "../wallet-chart/wallet-chart.module";
import { ProfilePageRoutingModule } from "./profile-page-routing.module";
import { ProfilePageComponent } from "./profile-page.component";


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    ProfilePageRoutingModule,
    CommonModule,
    RouterModule,
    WalletChartModule,
    PipesModule
  ]
})
export class ProfilePageModule {
}
