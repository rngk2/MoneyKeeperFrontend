import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from "rxjs/operators";

import { ApiContractCategoryOverview } from '../../api/api.generated';
import { AddCategoryFormComponent } from '../add-category-form/add-category-form.component';
import CategoriesStore from "../store/categories/categories.store";
import ChartStore from "../store/chart/chart.store";
import { Total } from "../store/chart/types";
import TransactionsStore from "../store/transactions/transactions.store";
import { AddEarningFormComponent } from '../transactions/add-earning-form/add-earning-form.component';
import { compareFn, Range, RangeOffsetController } from "../utils";
import { CARDS_LAZY_LOADING_OPTIONS } from "./cards.container.constants";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsContainerComponent implements OnInit {

  public overview$: Observable<ApiContractCategoryOverview[]>;
  // TODO: fix chart when category name changes
  public chart$: Observable<Total | undefined>;
  // TODO: fix isFetched logic
  public isFetched = false;
  public sortComparator = compareFn<ApiContractCategoryOverview>('categoryName');

  private range = new RangeOffsetController(CARDS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, CARDS_LAZY_LOADING_OPTIONS.STEP);

  constructor(
    private readonly dialog: MatDialog,
    private readonly categoriesStore: CategoriesStore,
    private readonly transactionsStore: TransactionsStore,
    private readonly chartStore: ChartStore,
  ) {
    this.overview$ = categoriesStore.overview.pipe(distinctUntilChanged());
    this.chart$ = chartStore.total.pipe(distinctUntilChanged());
  }

  public ngOnInit(): void {
    this.drawChart();
    this.fetchOverview(this.range.getNextRange());
  }

  public addCategory(): void {
    this.dialog.open(AddCategoryFormComponent, {
      width: '40rem'
    });
  }

  public addEarning(): void {
    this.dialog.open(AddEarningFormComponent, {
      width: '40rem'
    });
  }

  public onScroll(): void {
    this.fetchOverview(this.range.getNextRange());
  }

  private fetchOverview(range: Range): void {
    this.categoriesStore.fetchOverview({
      from: range.begin,
      to: range.end,
    });
    this.isFetched = true;
  }

  private drawChart(): void {
    this.chartStore.fetchTotal();
  }
}
