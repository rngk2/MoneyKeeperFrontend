import {Component, Input, OnInit} from '@angular/core';
import {ChartColor, ChartOptions, ChartType} from "chart.js";
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";

@Component({
  selector: 'wallet-chart',
  templateUrl: './wallet-chart.component.html',
  styleUrls: ['./wallet-chart.component.scss']
})
export class WalletChartComponent implements OnInit {
  chartOptions: ChartOptions = {
    responsive: true,
  };

  @Input() chartLabels!: Label[]
  @Input() chartData!: SingleDataSet

  chartType: ChartType = 'doughnut';
  chartLegend = true;
  chartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
  }

}
