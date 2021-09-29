import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import ITransaction from '../entities/transaction.entity';
import CategoriesStore from "../store/categories/categories.store";
import TransactionsStore from "../store/transactions/transactions.store";
import { AboutTransactionComponent } from '../transactions/about-transaction/about-transaction.component';
import { TRANSACTIONS_PREVIEW_MAX_LENGTH } from "./category-card.constants";

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent implements OnInit {

  public state: 'collapsed' | 'expanded' = 'collapsed';
  public lastTransactions?: Observable<ITransaction[]>;
  public addTransaction = false;
  public edit: boolean = false;

  @Input() public categoryName!: string;
  @Input() public categoryId!: number;
  @Input() public spendThisMonth!: number;

  @ViewChild('editInput') public editInput!: ElementRef;

  constructor(
    private readonly dialog: MatDialog,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly transactionsStore: TransactionsStore,
    private readonly categoriesStore: CategoriesStore
  ) {
  }

  public ngOnInit(): void {
    this.lastTransactions = this.transactionsStore.transactionsForCategory(this.categoryId);
  }

  public toggle(): void {
    if (this.state === 'collapsed') {
      this.transactionsStore.fetchTransactionsForCategory({
        categoryId: this.categoryId,
        from: 0,
        to: TRANSACTIONS_PREVIEW_MAX_LENGTH
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
      data: {
        message: `Delete '${ this.categoryName }' ?`,
        onAnswer: (ok: 'yes' | 'no') => {
          if (ok === 'yes') {
            this.categoriesStore.deleteCategory(this.categoryId);
          }
          confirmRef.close();
        }
      }
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

  public onAddTransactionSubmit(): void {
    this.addTransaction = false;
  }
}
