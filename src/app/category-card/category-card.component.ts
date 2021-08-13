import {Component, Inject, Input, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {AboutTransactionComponent} from "../about-transaction/about-transaction.component";
import {BASE_SERVER_URL} from "../app.config";
import {ConfirmPopupComponent} from "../confirm-popup/confirm-popup.component";
import CardsContainerStore from "../store/cards-store/cards-container.store";

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
  public addTransaction = false
  public showConfirm = false

  @Input() public categoryName!: string
  @Input() public categoryId!: number
  @Input() public spendThisMonth!: number
  @Input() public lastTransactions!: Transaction[]

  private readonly lastTransactionsMaxLength = 5

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService,
              private readonly dialog: MatDialog,
              private readonly confirm: MatDialog,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly cardsStore: CardsContainerStore) { }

  public ngOnInit(): void {
    if (this.lastTransactions.length > this.lastTransactionsMaxLength) {
      this.lastTransactions = this.lastTransactions.slice(0, this.lastTransactionsMaxLength - 1)
    }
  }

  public toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed'
  }

  public delete(): void {
    const confirmRef = this.dialog.open(ConfirmPopupComponent, {
      width: '30rem',
      data: `Delete "${this.categoryName}" ?`
    })
    const sub = confirmRef.componentInstance.onAnswer.subscribe((ok: boolean) => {
      if (ok)
        this.httpClient.delete(this.serverUrl + `/categories/${this.userService.getCurrentUser().id}/${this.categoryName}`)
            .subscribe(res => this.cardsStore.updateState())
      confirmRef.close()
    })
  }

  public showMoreForTransaction(transaction: Transaction): void {
    this.dialog.open(AboutTransactionComponent, {
      width: '20rem',
      data: transaction
    });
  }
}
