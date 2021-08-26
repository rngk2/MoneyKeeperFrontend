import {Component, OnInit} from '@angular/core';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import Transaction from '../entities/transaction.entity';
import {BehaviorSubject} from 'rxjs';

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

  constructor(private readonly userService: UserService) {
    userService.currentUserService.getCurrentUserAsObservable()
      .subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.fetchTotalForMonth();
    this.fetchTotalForYear();
  }

  private fetchTotalForMonth(): void {/*
    <object>*/(this.userService.api.totalMonthList())
      .subscribe(res => {
        //@ts-ignore
        const total = res.data;
        if (total.hasOwnProperty(Transaction.inputTransactionName)) {
          // @ts-ignore
          this.earnedForMonth = total[Transaction.inputTransactionName];
          // @ts-ignore
          delete total[Transaction.inputTransactionName];
        }
        this.names_month.next(this.getCategoriesNames(total));
        this.amount_month.next(this.getAmountForCategories(total));
        this.spent_month = this.reduce(this.amount_month.value);
      });
  }

  private fetchTotalForYear(): void {/*
    <object>*/(this.userService.api.totalYearList())
      .subscribe(res => {
        //@ts-ignore
        const total = res.data;
        total.hasOwnProperty(Transaction.inputTransactionName) &&
        // @ts-ignore
        delete total[Transaction.inputTransactionName];
        this.names_year.next(this.getCategoriesNames(total));
        this.amount_year.next(this.getAmountForCategories(total));
        this.spent_year = this.reduce(this.amount_year.value);
      });
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
