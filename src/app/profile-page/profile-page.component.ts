import {Component, OnInit} from '@angular/core';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import Transaction from '../entities/transaction.entity';
import {BehaviorSubject} from 'rxjs';
import CacheService from '../services/cache.service'

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user: User | null = null;

  public earnedForMonth: number = 0;

  public names_month = new BehaviorSubject<string[]>([]);
  public amount_month = new BehaviorSubject<number[]>([]);

  public names_year = new BehaviorSubject<string[]>([]);
  public amount_year = new BehaviorSubject<number[]>([]);

  public spent_month = 0;
  public spent_year = 0;

  public static readonly PROFILE_PAGE_CACHE_FRESH_CHECK_PATH = 'profile-page__data';
  private static readonly CACHE_TOTAL_MONTH_PATH = 'profile-page__data__total-month';
  private static readonly CACHE_TOTAL_YEAR_PATH = 'profile-page__data__total-year';

  constructor(private readonly userService: UserService,
              private readonly cache: CacheService) {
    userService.currentUserService.getCurrentUserAsObservable()
      .subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    if (this.cache.isFresh(ProfilePageComponent.PROFILE_PAGE_CACHE_FRESH_CHECK_PATH)) {
      this.summarizeMonth(this.cache.get<object>(ProfilePageComponent.CACHE_TOTAL_MONTH_PATH)!);
      this.summarizeYear(this.cache.get<object>(ProfilePageComponent.CACHE_TOTAL_YEAR_PATH)!);
      return;
    }

    this.fetchTotalForMonth();
    this.fetchTotalForYear();
  }

  private fetchTotalForMonth(): void {
    this.userService.api.totalMonthList()
      .subscribe(res => {
        this.cache.save<object>(ProfilePageComponent.CACHE_TOTAL_MONTH_PATH, res.data);
        this.summarizeMonth(res.data);
      });
  }

  private fetchTotalForYear(): void {
    this.userService.api.totalYearList()
      .subscribe(res => {
        this.cache.save<object>(ProfilePageComponent.CACHE_TOTAL_YEAR_PATH, res.data);
        this.summarizeYear(res.data);
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
    return a.reduce((acc, curr) => acc + curr);
  }
}
