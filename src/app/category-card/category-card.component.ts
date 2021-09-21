import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { TransactionDto } from "../../api/api.generated";
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import ITransaction from '../entities/transaction.entity';
import CategoriesStore from "../store/categories/categories.store";
import TransactionsStore from "../store/transactions/transactions.store";
import { AboutTransactionComponent } from '../transactions/about-transaction/about-transaction.component';

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
export class CategoryCardComponent implements OnInit, OnDestroy {

  private static readonly lastTransactionsMaxLength = 5;
  public state: 'collapsed' | 'expanded' = 'collapsed';
  public lastTransactions!: ITransaction[] | TransactionDto[];
  public addTransaction = false;
  public edit: boolean = false;

  @Input() public categoryName!: string;
  @Input() public categoryId!: number;
  @Input() public spendThisMonth!: number;

  @ViewChild('editInput') public editInput!: ElementRef;

  private readonly subs$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly transactionsStore: TransactionsStore,
    private readonly categoriesStore: CategoriesStore
  ) {
  }

  public ngOnInit(): void {
    this.transactionsStore.transactionsForCategory().subscribe(value => {
      if (value && value[this.categoryId]) {
        this.lastTransactions = value[this.categoryId];
      }
    });
  }

  public toggle(): void {
    if (!this.lastTransactions && this.state === 'collapsed') {
      this.transactionsStore.fetchTransactionsForCategory({
        categoryId: this.categoryId,
        from: 0,
        to: CategoryCardComponent.lastTransactionsMaxLength
      });
    }

    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';

    if (this.state === 'collapsed') {
      this.addTransaction = false;
    }
  }

  public deleteCategory(): void {
    const confirmRef = this.dialog.open(ConfirmPopupComponent, {
      width: '30rem',
      data: `Delete '${ this.categoryName }' ?`
    });
    confirmRef.componentInstance.onAnswer.subscribe((ok: boolean) => {
      if (ok) {
        this.categoriesStore.deleteCategory(this.categoryId);
      }
      confirmRef.close();
    });
  }

  public showMoreForTransaction(transaction: ITransaction): void {
    this.dialog.open(AboutTransactionComponent, {
      width: '20rem',
      data: transaction
    });
  }

  public editEnable(): void {
    this.edit = true;
    this.changeDetector.detectChanges();
    this.editInput.nativeElement.focus();
  }

  public editSave(): void {
    if (!this.editInput.nativeElement.value) {
      return;
    }
    this.categoriesStore.updateCategory({
      categoryId: this.categoryId,
      data: {
        name: this.editInput.nativeElement.value
      }
    });
    this.editDisable();
  }

  public editDisable(): void {
    this.edit = false;
  }

  public ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.unsubscribe();
  }
}
