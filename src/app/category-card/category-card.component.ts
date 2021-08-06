import {Component, Input, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import HttpService from "../services/http.service";
import UserService from "../services/user.service";
import {Observable, Subscription} from "rxjs";
import CategoriesState from "../state/categories.state";
import categoriesState from "../state/categories.state";

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  animations: [
  trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])
]
})
export class CategoryCardComponent implements OnInit {

  state: 'collapsed' | 'expanded' = 'collapsed'

  @Input() subscription!: Subscription

  @Input() categoryName!: string
  @Input() spendThisMonth!: number
  @Input() lastTransactions!: Transaction[]

  private lastTransactionsMaxLength = 5
  addTransaction: boolean = false

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    if (this.lastTransactions.length > this.lastTransactionsMaxLength) {
      this.lastTransactions = this.lastTransactions.slice(0, this.lastTransactionsMaxLength - 1)
    }
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed'
  }

  delete(): void {
    this.httpClient.delete(environment.serverUrl + `/categories/10/${this.categoryName}`)
      .subscribe(res => categoriesState.updateState())
  }
}
