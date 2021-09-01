import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Transaction from '../entities/transaction.entity';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AboutTransactionComponent} from '../transactions/about-transaction/about-transaction.component';
import {ConfirmPopupComponent} from '../confirm-popup/confirm-popup.component';
import CardsContainerStore from '../store/cards-store/cards-container.store';
import CategoryService from '../services/category.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({height: '0px', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CategoryCardComponent implements OnInit, OnDestroy {

  public state: 'collapsed' | 'expanded' = 'collapsed';
  public addTransaction = false;

  @Input() public categoryName!: string;
  @Input() public categoryId!: number;
  @Input() public spendThisMonth!: number;
  @Input() public lastTransactions!: Transaction[];

  private static readonly lastTransactionsMaxLength = 5;

  private readonly subs = new Subject<void>();

  constructor(private readonly dialog: MatDialog,
              private readonly confirm: MatDialog,
              private readonly cardsStore: CardsContainerStore,
              private readonly categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    if (this.lastTransactions.length > CategoryCardComponent.lastTransactionsMaxLength) {
      this.lastTransactions = this.lastTransactions.slice(0, CategoryCardComponent.lastTransactionsMaxLength - 1);
    }
  }

  public toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
    if (this.state === 'collapsed')
      this.addTransaction = false;
  }

  public delete(): void {
    const confirmRef = this.dialog.open(ConfirmPopupComponent, {
      width: '30rem',
      data: `Delete '${this.categoryName}' ?`
    });
    confirmRef.componentInstance.onAnswer.subscribe((ok: boolean) => {
      if (ok) {
        this.categoryService.api.categoriesDelete(this.categoryId)
          .pipe(takeUntil(this.subs))
          .subscribe(() => this.cardsStore.updateState());
      }
      confirmRef.close();
    });
  }

  public showMoreForTransaction(transaction: Transaction): void {
    this.dialog.open(AboutTransactionComponent, {
      width: '20rem',
      data: transaction
    });
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
