import { Component, OnInit } from '@angular/core';
import Transaction from "../entities/transaction.entity";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit  {

  category_transactions = new Map<string, Transaction[]>()

  constructor() { }

  ngOnInit(): void {
    this.category_transactions = new Map<string, Transaction[]>()
    // mock data
    this.category_transactions.set("Category 1", [
      {
        amount: 1020,
        timestamp: "11-12-2021"
      },
      {
        amount: 1020,
        timestamp: "11-12-2021"
      },
    ])
    this.category_transactions.set("Category 2", [
      {
        amount: 2020,
        timestamp: "12-12-2021"
      },
      {
        amount: 2020,
        timestamp: "12-12-2021"
      },
      {
        amount: 13020,
        timestamp: "19-12-2021"
      }
    ])
    this.category_transactions.set("Category 3", [
      {
        amount: 302.50,
        timestamp: "11-11-2021"
      },
      {
        amount: 2020,
        timestamp: "11-10-2021"
      },
    ])
    this.category_transactions.set("Category 4", [
      {
        amount: 1020,
        timestamp: "11-12-2021"
      },
      {
        amount: 1020,
        timestamp: "11-12-2021"
      },
    ])
    this.category_transactions.set("Category 5", [
      {
        amount: 102,
        timestamp: "11-12-2021"
      },
      {
        amount: 1020,
        timestamp: "11-12-2021"
      },
      {
        amount: 10203.75,
        timestamp: "8-10-2021"
      }
    ])
  }

  calculateAmountForMonth(transactions: Transaction[]): number {
    let amountForMonth = 0
    for (let transaction of transactions)
      amountForMonth += transaction.amount

    return amountForMonth
  }
}
