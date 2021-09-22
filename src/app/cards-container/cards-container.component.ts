import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject } from 'rxjs';

import { CategoryOverview } from '../../api/api.generated';
import { AddCategoryFormComponent } from '../add-category-form/add-category-form.component';
import { INPUT_TRANSACTION_NAME } from "../entities/transaction.entity";
import CategoryService from "../services/category.service";
import CategoriesStore from "../store/categories/categories.store";
import ChartStore from "../store/chart/chart.store";
import TransactionsStore from "../store/transactions/transactions.store";
import { AddEarningFormComponent } from '../transactions/add-earning-form/add-earning-form.component';
import { Range, RangeOffsetController } from "../utils";
import { CARDS_LAZY_LOADING_OPTIONS } from "./cards.container.constants";

@UntilDestroy()
@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  public categoriesNames$ = new BehaviorSubject<string[]>([]);
  public amountForCategories$ = new BehaviorSubject<number[]>([]);
  public overview$ = new BehaviorSubject<CategoryOverview[]>([]);
  public isFetched = false;
  
  private readonly categoryUtils = new CategoryService.CategoryServiceUtils();

  private range = new RangeOffsetController(CARDS_LAZY_LOADING_OPTIONS.BEGIN_OFFSET, CARDS_LAZY_LOADING_OPTIONS.STEP);

  constructor(
    private readonly dialog: MatDialog,
    private readonly categoriesStore: CategoriesStore,
    private readonly transactionsStore: TransactionsStore,
    private readonly chartStore: ChartStore,
  ) {
    this.categoriesStore.overview
      .subscribe(value => {
        if (!value || value.length < 1) {
          return;
        }
        this.overview$.next(
          this.categoryUtils.sortOverviewAlphabetically(
            value.filter(o => o.categoryName !== INPUT_TRANSACTION_NAME)
          )
        );
        this.isFetched = true;
      });
  }

  public ngOnInit(): void {
    this.chartStore.total
      .subscribe(value => {
        if (value) {
          this.categoriesNames$.next(this.categoryUtils.getCategoriesNames(value));
          this.amountForCategories$.next(this.categoryUtils.getAmountForCategories(value));
        }
      });

    this.overview$
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
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
      });
  }

  public addEarning(): void {
    this.dialog.open(AddEarningFormComponent, {
      width: '40rem'
    }).afterClosed()
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
      });
  }

  public onScroll(): void {
    this.fetchSummary(this.range.getNextRange());
  }
}
