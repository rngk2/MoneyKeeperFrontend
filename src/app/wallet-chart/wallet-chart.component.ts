import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {Observable} from 'rxjs';

@Component({
  selector: 'wallet-chart',
  templateUrl: './wallet-chart.component.html',
  styleUrls: ['./wallet-chart.component.scss']
})
export class WalletChartComponent implements OnInit {

  public chartType: ChartType = 'doughnut';
  public chartLegend = true;
  public chartPlugins = [];
  public chartOptions: ChartOptions = {
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

  public chartLabels: Label[] | undefined = undefined;
  public chartData: SingleDataSet | undefined = undefined;

  @Input() public chartLabelsObservable!: Observable<Label[]>;
  @Input() public chartDataObservable!: Observable<SingleDataSet>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.chartLabelsObservable.subscribe(labels => this.chartLabels = labels);
    this.chartDataObservable.subscribe(data => this.chartData = data);
  }
}
