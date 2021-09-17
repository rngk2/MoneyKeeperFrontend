import {Component, OnDestroy, OnInit} from '@angular/core';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import Transaction from '../entities/transaction.entity';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import CacheService from '../services/cache.service';
import {takeUntil} from "rxjs/operators";
import UserStore from "../store/user/user.store";
import ChartStore from "../store/chart/chart.store";
import {__classPrivateFieldGet} from "tslib";

type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
}

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  public user: Observable<User | undefined>

  public earnedForMonth: number = 0;

  public names_month = new BehaviorSubject<string[]>([]);
  public amount_month = new BehaviorSubject<number[]>([]);

  public names_year = new BehaviorSubject<string[]>([]);
  public amount_year = new BehaviorSubject<number[]>([]);

  public spent_month = 0;
  public spent_year = 0;

  private readonly subs = new Subject<void>();

  private static readonly CACHE_TOTAL_MONTH_PATH = 'profile-page__data__total-month';
  private static readonly CACHE_TOTAL_YEAR_PATH = 'profile-page__data__total-year';

  constructor(private readonly userService: UserService,
              private readonly cache: CacheService,
              private readonly userStore: UserStore,
              private readonly chartStore: ChartStore) {
    this.user =  this.userStore.getUser();

  }

  ngOnInit(): void {
    this.chartStore.totalMonth
      .pipe(takeUntil(this.subs))
      .subscribe(value => value && this.summarizeMonth(value!))

    this.chartStore.totalYear
      .pipe(takeUntil(this.subs))
      .subscribe(value => value && this.summarizeYear(value!))

    this.chartStore.fetchTotalForMonth();
    this.chartStore.fetchTotalForYear()
  }

  // private fetchTotalForMonth(): void {
  //   this.userService.api.totalMonthList()
  //     .pipe(takeUntil(this.subs))
  //     .subscribe(res => {
  //       this.cache.save<object>(ProfilePageComponent.CACHE_TOTAL_MONTH_PATH, res.data.value);
  //       this.summarizeMonth(res.data.value);
  //     });
  // }

  // private fetchTotalForYear(): void {
  //   this.userService.api.totalYearList()
  //     .pipe(takeUntil(this.subs))
  //     .subscribe(res => {
  //       this.cache.save<object>(ProfilePageComponent.CACHE_TOTAL_YEAR_PATH, res.data.value);
  //       this.summarizeYear(res.data.value);
  //     });
  // }

  private summarizeMonth(totalMonth: Record<string, number>): void {
    if (totalMonth.hasOwnProperty(Transaction.inputTransactionName)) {
      this.earnedForMonth = totalMonth[Transaction.inputTransactionName];
    }
    this.names_month.next(this.getCategoriesNames(totalMonth));
    this.amount_month.next(this.getAmountForCategories(totalMonth));
    this.spent_month = this.reduce(this.amount_month.value);
  }

  private summarizeYear(totalYear: Record<string, number>): void {
    // totalYear.hasOwnProperty(Transaction.inputTransactionName) &&
    // // @ts-ignore
    // delete totalYear[Transaction.inputTransactionName];
    this.names_year.next(this.getCategoriesNames(totalYear));
    this.amount_year.next(this.getAmountForCategories(totalYear));
    this.spent_year = this.reduce(this.amount_year.value);
  }

  /**
   * @param total - is total spent for each category
   * @returns {string[]} - Categories names with {Transaction.inputTransactionName} excluded
   */
  public getCategoriesNames(total: Record<string, number>): string[] {
    return Object.keys(total).filter(value =>
      value !== Transaction.inputTransactionName
    );
  }

  /**
   * @param total - is total spent for each category
   * @returns {number[]} - Spent for each category with {Transaction.inputTransactionName} excluded
   */
  public getAmountForCategories(total: Record<string, number>): number[] {
    return Object.values(total).filter((value, index) =>
      Object.keys(total)[index] !== Transaction.inputTransactionName
    );
  }

  public reduce(a: number[]): number {
    if (a.length === 0) {
      return 0;
    }
    return a.reduce((acc, curr) => acc + curr);
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
