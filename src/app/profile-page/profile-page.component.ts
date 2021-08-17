import {Component, Inject, OnInit} from '@angular/core';
import UserService from "../services/user.service";
import User from "../entities/user.entity";
import {HttpClient} from "@angular/common/http";
import {BASE_SERVER_URL} from "../app.config";
import Transaction from "../entities/transaction.entity";

type Total = Map<string, number>

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user: User | undefined
  public totalForMonth = {}
  public totalForYear = {}
  public earnedForMonth!: number

  constructor(private readonly userService: UserService,
              private readonly http: HttpClient,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string) {
    userService.getCurrentUserAsObservable()
      .subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.fetchTotalForMonth()
    this.fetchTotalForYear()
  }

  private fetchTotalForMonth(): void {
    this.http.get<Total>(this.serverUrl + `/users/${this.user!.id}/total/month`)
      .subscribe(total => {
        this.totalForMonth = total
        // @ts-ignore
        this.earnedForMonth = total[Transaction.inputTransactionName]
      })
  }

  private fetchTotalForYear(): void {
    this.http.get<Total>(this.serverUrl + `/users/${this.user!.id}/total/year`)
      .subscribe(total => this.totalForYear = total)
  }

  public getCategoriesNames(total: object): string[] {
    return Object.keys(total)
  }

  public amountCache: number[] = []
  public getAmountForCategories(total: object): number[] {
    let categories = this.getCategoriesNames(total)
    let amountForCategories: number[] = []
    for (let category of categories) {
        // @ts-ignore
        amountForCategories.push(<number>total[category])
      }

    this.amountCache = amountForCategories
    return amountForCategories
  }

  public reduce(a: number[]): number {
    return a.reduce((acc, curr) => acc + curr)
  }

}
