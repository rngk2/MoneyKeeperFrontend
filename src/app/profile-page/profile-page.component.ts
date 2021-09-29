import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import IUser from '../entities/user.entity';
import CategoriesStore from "../store/categories/categories.store";
import ChartStore from "../store/chart/chart.store";
import { Total } from "../store/chart/types";
import UserStore from "../store/user/user.store";

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
// TODO: fix chart when category name changes
  public readonly user$: Observable<IUser | undefined>;
  public readonly earnedMonth$: Observable<number>;
  public readonly spentMonth$: Observable<number>;
  public readonly spentYear$: Observable<number>;
  public readonly totalMonth$: Observable<Total | undefined>;
  public readonly totalYear$: Observable<Total | undefined>;

  constructor(
    private readonly userStore: UserStore,
    private readonly chartStore: ChartStore,
    private readonly categoriesStore: CategoriesStore
  ) {
    this.user$ = userStore.user;
    this.totalMonth$ = chartStore.totalMonth;
    this.totalYear$ = chartStore.totalYear;
    this.spentMonth$ = chartStore.amountMonth;
    this.spentYear$ = chartStore.amountYear;
    this.earnedMonth$ = categoriesStore.earningsOverview.pipe(map(value => value?.spentThisMonth || 0));
  }

  public ngOnInit(): void {
    this.chartStore.fetchTotalForMonth();
    this.chartStore.fetchTotalForYear();
    this.categoriesStore.fetchOverviewForEarnings();
  }
}
