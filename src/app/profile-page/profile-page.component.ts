import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from 'rxjs';

import { INPUT_TRANSACTION_NAME } from "../entities/transaction.entity";
import IUser from '../entities/user.entity';
import ChartStore from "../store/chart/chart.store";
import { Total } from "../store/chart/types";
import UserStore from "../store/user/user.store";

@UntilDestroy()
@UntilDestroy()
@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user$: Observable<IUser | undefined>;

  public earnedForMonth: number = 0;

  public names_month$ = new BehaviorSubject<string[]>([]);
  public amount_month$ = new BehaviorSubject<number[]>([]);

  public names_year$ = new BehaviorSubject<string[]>([]);
  public amount_year$ = new BehaviorSubject<number[]>([]);

  public spent_month = 0;
  public spent_year = 0;

  constructor(
    private readonly userStore: UserStore,
    private readonly chartStore: ChartStore
  ) {
    this.user$ = this.userStore.getUser();
  }

  ngOnInit(): void {
    this.chartStore.totalMonth
      .subscribe(value => value && this.summarizeMonth(value!));

    this.chartStore.totalYear
      .subscribe(value => value && this.summarizeYear(value!));

    this.chartStore.fetchTotalForMonth();
    this.chartStore.fetchTotalForYear();
  }

  /**
   * @param total - is total spent for each category
   * @returns {string[]} - Categories names with {Transaction.inputTransactionName} excluded
   */
  public getCategoriesNames(total: Total): string[] {
    return Object.keys(total).filter(value =>
      value !== INPUT_TRANSACTION_NAME
    );
  }

  /**
   * @param total - is total spent for each category
   * @returns {number[]} - Spent for each category with {Transaction.inputTransactionName} excluded
   */
  public getAmountForCategories(total: Total): number[] {
    return Object.values(total).filter((value, index) =>
      Object.keys(total)[index] !== INPUT_TRANSACTION_NAME
    );
  }

  public reduce(a: number[]): number {
    if (a.length === 0) {
      return 0;
    }
    return a.reduce((acc, curr) => acc + curr);
  }

  private summarizeMonth(totalMonth: Total): void {
    if (totalMonth.hasOwnProperty(INPUT_TRANSACTION_NAME)) {
      this.earnedForMonth = totalMonth[INPUT_TRANSACTION_NAME];
    }
    this.names_month$.next(this.getCategoriesNames(totalMonth));
    this.amount_month$.next(this.getAmountForCategories(totalMonth));
    this.spent_month = this.reduce(this.amount_month$.value);
  }

  private summarizeYear(totalYear: Total): void {
    this.names_year$.next(this.getCategoriesNames(totalYear));
    this.amount_year$.next(this.getAmountForCategories(totalYear));
    this.spent_year = this.reduce(this.amount_year$.value);
  }
}
