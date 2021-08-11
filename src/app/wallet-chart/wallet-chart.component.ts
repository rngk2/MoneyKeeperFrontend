import {Component, Input} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";

@Component({
  selector: 'wallet-chart',
  templateUrl: './wallet-chart.component.html',
  styleUrls: ['./wallet-chart.component.scss']
})
export class WalletChartComponent {

  public chartType: ChartType = 'doughnut';
  public chartLegend = true;
  public chartPlugins = [];
  public chartOptions: ChartOptions = {
    animation: {
      duration: 3200
    },
    responsive: true,
    responsiveAnimationDuration: 3200,
    legend:{
      labels: {
        fontColor: 'white',
        fontSize: 15,
        fontStyle: 'italic'
      }
    },
  };

  @Input() public chartLabels!: Label[]
  @Input() public chartData!: SingleDataSet

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
}
