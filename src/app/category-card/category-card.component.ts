import { Component, OnInit } from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-category-card',
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
export class CategoryCardComponent {

  state: 'collapsed' | 'expanded' = 'collapsed'

  categoryName = 'Category 1'
  spendThisMonth = 2343.25
  lastTransactions: Transaction[] = [
    {
        categoryName: "Cat1",
        amount: 324,
        timestamp: '12-12-12'
    },
    {
      categoryName: "Cat1",
      amount: 324,
      timestamp: '12-12-12'
    },
    {
      categoryName: "Cat1",
      amount: 324,
      timestamp: '12-12-12'
    },
    {
      categoryName: "Cat1",
      amount: 324,
      timestamp: '12-12-12'
    }
  ]

  private lastTransactionsMaxLength = 5

  constructor() { }


  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed'
  }
}
