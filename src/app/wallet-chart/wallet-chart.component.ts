import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Observable } from 'rxjs';

import { Total } from "../store/chart/types";
import { extractAmounts, extractNames } from "./wallet-chart.transform-funcs";

@Component({
  selector: 'wallet-chart',
  templateUrl: './wallet-chart.component.html',
  styleUrls: ['./wallet-chart.component.scss'],
})
export class WalletChartComponent {

  public readonly chartType: ChartType = 'doughnut';
  public readonly chartLegend = true;
  public readonly chartPlugins = [];
  public readonly chartOptions: ChartOptions = {
    animation: {
      duration: 3200
    },
    responsive: true,
    responsiveAnimationDuration: 3200,
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 15,
        fontStyle: 'italic'
      }
    },
  };
  public readonly extractAmountsFunc = extractAmounts;
  public readonly extractNamesFunc = extractNames;

  @Input() public chartTotal$!: Observable<Total>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
}
