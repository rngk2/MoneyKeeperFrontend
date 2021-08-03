import {Component, Input} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
export class CategoryCardComponent {

  state: 'collapsed' | 'expanded' = 'collapsed'

  @Input() categoryName!: string
  @Input() spendThisMonth!: number
  @Input() lastTransactions!: Transaction[]

  private lastTransactionsMaxLength = 5

  constructor() { }


  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed'
  }
}
