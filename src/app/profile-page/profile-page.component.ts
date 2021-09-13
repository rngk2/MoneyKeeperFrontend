import {Component, OnDestroy, OnInit} from '@angular/core';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import Transaction from '../entities/transaction.entity';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import CacheService from '../services/cache.service';
import {takeUntil} from "rxjs/operators";
import UserStore from "../store/user/user.store";

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
              private readonly userStore: UserStore) {
    this.user =  this.userStore.getUser();
  }

  ngOnInit(): void {
    if (this.cache.isFresh(ProfilePageComponent.CACHE_TOTAL_MONTH_PATH) && this.cache.isFresh(ProfilePageComponent.CACHE_TOTAL_YEAR_PATH)) {
      this.summarizeMonth(this.cache.get<object>(ProfilePageComponent.CACHE_TOTAL_MONTH_PATH)!);
      this.summarizeYear(this.cache.get<object>(ProfilePageComponent.CACHE_TOTAL_YEAR_PATH)!);
      return;
    }
    this.fetchTotalForMonth();
    this.fetchTotalForYear();
  }

  private fetchTotalForMonth(): void {
    this.userService.api.totalMonthList()
      .pipe(takeUntil(this.subs))
      .subscribe(res => {
        this.cache.save<object>(ProfilePageComponent.CACHE_TOTAL_MONTH_PATH, res.data.value);
        this.summarizeMonth(res.data.value);
      });
  }

  private fetchTotalForYear(): void {
    this.userService.api.totalYearList()
      .pipe(takeUntil(this.subs))
      .subscribe(res => {
        this.cache.save<object>(ProfilePageComponent.CACHE_TOTAL_YEAR_PATH, res.data.value);
        this.summarizeYear(res.data.value);
      });
  }

  private summarizeMonth(totalMonth: object): void {
    if (totalMonth.hasOwnProperty(Transaction.inputTransactionName)) {
      // @ts-ignore
      this.earnedForMonth = totalMonth[Transaction.inputTransactionName];
      // @ts-ignore
      delete totalMonth[Transaction.inputTransactionName];
    }
    this.names_month.next(this.getCategoriesNames(totalMonth));
    this.amount_month.next(this.getAmountForCategories(totalMonth));
    this.spent_month = this.reduce(this.amount_month.value);
  }

  private summarizeYear(totalYear: object): void {
    totalYear.hasOwnProperty(Transaction.inputTransactionName) &&
    // @ts-ignore
    delete totalYear[Transaction.inputTransactionName];
    this.names_year.next(this.getCategoriesNames(totalYear));
    this.amount_year.next(this.getAmountForCategories(totalYear));
    this.spent_year = this.reduce(this.amount_year.value);
  }

  public getCategoriesNames(total: object): string[] {
    return Object.keys(total);
  }

  public getAmountForCategories(total: object): number[] {
    return Object.values(total);
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
