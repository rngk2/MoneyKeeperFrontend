import {Component, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import UserService from "../services/user.service";
import CategoriesState from "../state/categories.state";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  category_transactions = new Map<string, Transaction[]>()

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  ngOnInit(): void {
    CategoriesState.getObservableState().subscribe(() => this.fetchSummary())
    CategoriesState.updateState()
  }

  fetchSummary() {
    this.http.get<Transaction[]>(environment.serverUrl + `/users/${this.userService.getCurrentUser().id}/summary`)
      .subscribe(transactions => {
        this.category_transactions = new Map<string, Transaction[]>()

        for (const transaction of transactions) {
          const containedTransactions = this.category_transactions.get(transaction.categoryName!)
          const newSet: Transaction[] = containedTransactions == null ? [transaction]
            : [...containedTransactions, transaction]
          this.category_transactions.set(transaction.categoryName!, newSet)
        }
      })
  }

  private getEmptyArrayIfTransactionIsSpoiled(transaction: Transaction): Transaction[] {
    return transaction.amount === 0 ? [] : [transaction]
  }

  calculateAmountForMonth(transactions: Transaction[]): number {
    const currentMonth = new Date().getMonth()
    let amountForMonth = 0
    for (const transaction of transactions)
      if (new Date(transaction.timestamp).getMonth() === currentMonth)
        amountForMonth += transaction.amount

    return amountForMonth
  }

  getCategoriesNames(): string[] {
    return [...this.category_transactions.keys()]
  }

  getAmountForCategories(categories: string[]): number[] {
    let amountForCategories: number[] = []
    for (let category of categories)
      amountForCategories.push(<number>this.getAmountForCategory(category))

    return amountForCategories
  }

  private getAmountForCategory(categoryName: string): number | undefined {
    return this.category_transactions.get(categoryName)?.map(t => t.amount)
      .reduce((acc, curr) => acc + curr)
  }
}
