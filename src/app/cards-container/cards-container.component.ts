import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

import { CategoryOverview } from '../../api/api.generated';
import { AddCategoryFormComponent } from '../add-category-form/add-category-form.component';
import { INPUT_TRANSACTION_NAME } from "../entities/transaction.entity";
import CategoryService from "../services/category.service";
import CategoriesStore from "../store/categories/categories.store";
import ChartStore from "../store/chart/chart.store";
import { AddEarningFormComponent } from '../transactions/add-earning-form/add-earning-form.component';
import { Range, RangeOffsetController } from "../utils";
import { CARDS_LAZY_LOADING_OPTIONS } from "./cards.container.constants";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit, OnDestroy {

  public categoriesNames$ = new BehaviorSubject<string[]>([]);
  public amountForCategories$ = new BehaviorSubject<number[]>([]);
  public overview$ = new BehaviorSubject<CategoryOverview[]>([]);
  public isFetched = false;

  private readonly categoryUtils = new CategoryService.CategoryServiceUtils();
  private readonly subs$ = new Subject<void>();

  private range = new RangeOffsetController(CARDS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, CARDS_LAZY_LOADING_OPTIONS.STEP);

  constructor(
    private readonly dialog: MatDialog,
    private readonly categoriesStore: CategoriesStore,
    private readonly chartStore: ChartStore,
  ) {
    this.categoriesStore.overview
      .pipe(takeUntil(this.subs$))
      .subscribe(value => {
        this.overview$.next(
          value.filter(o => o.categoryName !== INPUT_TRANSACTION_NAME)
            .sort((a, b) => {
              if (!a.categoryName || !b.categoryName) {
                return 0;
              }
              else if (a.categoryName < b.categoryName) {
                return -1;
              }
              else if (a.categoryName > b.categoryName) {
                return 1;
              }
              return 0;
            })
        );
        this.isFetched = true;
      });
  }

  public ngOnInit(): void {
    this.chartStore.total
      .pipe(takeUntil(this.subs$))
      .subscribe(value => {
        if (value) {
          this.categoriesNames$.next(this.categoryUtils.getCategoriesNames(value));
          this.amountForCategories$.next(this.categoryUtils.getAmountForCategories(value));
        }
      });

    this.overview$
      .pipe(takeUntil(this.subs$))
      .subscribe(() => this.buildChart());

    this.fetchSummary(this.range.getNextRange());
  }

  public buildChart(): void {
    this.chartStore.fetchTotal();
  }

  public fetchSummary(range: Range): void {
    this.categoriesStore.fetchOverview({
      from: range.begin,
      to: range.end,
    });
  }

  public addCategory(): void {
    this.dialog.open(AddCategoryFormComponent, {
      width: '40rem'
    }).afterClosed()
      .pipe(takeUntil(this.subs$))
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
      });
  }

  public addEarning(): void {
    this.dialog.open(AddEarningFormComponent, {
      width: '40rem'
    }).afterClosed()
      .pipe(takeUntil(this.subs$))
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
      });
  }

  public onScroll(): void {
    this.fetchSummary(this.range.getNextRange());
  }

  public ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.unsubscribe();
  }
}
