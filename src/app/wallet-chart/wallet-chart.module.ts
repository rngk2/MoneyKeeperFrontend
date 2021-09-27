import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { PipesModule } from "../commons/pipes/pipes.module";

import { WalletChartComponent } from "./wallet-chart.component";

@NgModule({
  declarations: [
    WalletChartComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    WalletChartComponent
  ]
})
export class WalletChartModule {
}
