import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import UserService from "../services/user.service";
import {Observable, Subscription} from "rxjs";
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
    this.http.get<Transaction[]>(environment.serverUrl + `/users/10/summary`)
      .subscribe(transactions => {
        this.category_transactions = new Map<string, Transaction[]>()

        for (const transaction of transactions) {
            const containedTransactions = this.category_transactions.get(transaction.categoryName!)
            const newSet: Transaction[] = containedTransactions == null ? this.getEmptyArrayIfTransactionIsSpoiled(transaction)
              : [...containedTransactions, ...this.getEmptyArrayIfTransactionIsSpoiled(transaction)]
            this.category_transactions.set(transaction.categoryName!, newSet)
         }
      })
  }

  private getEmptyArrayIfTransactionIsSpoiled(transaction: Transaction): Transaction[] {
    return transaction.amount === 0 ? [] : [transaction]
  }

  calculateAmountForMonth(transactions: Transaction[]): number {
    let amountForMonth = 0
    for (const transaction of transactions)
      amountForMonth += transaction.amount

    return amountForMonth
  }
}
