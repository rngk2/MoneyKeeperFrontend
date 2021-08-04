import { Component, OnInit } from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import UserService from "../services/user.service";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit  {

  category_transactions = new Map<string, Transaction[]>()

  constructor(private http: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    this.category_transactions = new Map<string, Transaction[]>()
    this.http.get<Transaction[]>(environment.serverUrl + `/users/${this.userService.getCurrentUser().id}/summary`)
      .subscribe(transactions => {
        for (const transaction of transactions) {
          const containedTransactions = this.category_transactions.get(transaction.categoryName!)
          const newSet: Transaction[] = containedTransactions == null ? [transaction] : [...containedTransactions, transaction]

          this.category_transactions.set(transaction.categoryName!, newSet)
        }
      })
  }

  calculateAmountForMonth(transactions: Transaction[]): number {
    let amountForMonth = 0
    for (const transaction of transactions)
      amountForMonth += transaction.amount

    return amountForMonth
  }
}
