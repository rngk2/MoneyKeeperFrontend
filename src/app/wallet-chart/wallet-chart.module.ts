import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";

import { WalletChartComponent } from "./wallet-chart.component";

@NgModule({
  declarations: [
    WalletChartComponent
  ],
  imports: [
    ChartsModule,
    CommonModule
  ],
  exports: [
    WalletChartComponent
  ]
})
export class WalletChartModule {
}
