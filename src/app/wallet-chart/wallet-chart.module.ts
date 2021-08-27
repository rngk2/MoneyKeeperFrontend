import {NgModule} from "@angular/core";
import {WalletChartComponent} from "./wallet-chart.component";
import {ChartsModule} from "ng2-charts";
import {CommonModule} from "@angular/common";

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
export class WalletChartModule { }
