import {Component, Input, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import UserService from "../services/user.service";
import categoriesState from "../state/categories.state";
import {MatDialog} from "@angular/material/dialog";
import {AboutTransactionComponent} from "../about-transaction/about-transaction.component";

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

  public state: 'collapsed' | 'expanded' = 'collapsed'
  public addTransaction: boolean = false

  @Input() public categoryName!: string
  @Input() public categoryId!: number
  @Input() public spendThisMonth!: number
  @Input() public lastTransactions!: Transaction[]

  private readonly lastTransactionsMaxLength = 5

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService,
              private readonly dialog: MatDialog) { }

  public ngOnInit(): void {
    if (this.lastTransactions.length > this.lastTransactionsMaxLength) {
      this.lastTransactions = this.lastTransactions.slice(0, this.lastTransactionsMaxLength - 1)
    }
  }

  public toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed'
  }

  public delete(): void {
    this.httpClient.delete(environment.serverUrl + `/categories/${this.userService.getCurrentUser().id}/${this.categoryName}`)
      .subscribe(res => categoriesState.updateState())
  }

  public showMoreForTransaction(transaction: Transaction): void {
    this.dialog.open(AboutTransactionComponent, {
      width: '20rem',
      data: transaction
    });
  }
}
