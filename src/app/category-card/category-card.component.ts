import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Transaction from '../entities/transaction.entity';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AboutTransactionComponent} from '../transactions/about-transaction/about-transaction.component';
import {ConfirmPopupComponent} from '../confirm-popup/confirm-popup.component';
import CardsStore from '../store/cards/cards.store';
import CategoryService from '../services/category.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import TransactionsStore from "../store/transactions/transactions.store";
import {TransactionDto} from "../../api/api.generated";

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
  public lastTransactions!: Transaction[] | TransactionDto[];
  public addTransaction = false;
  public edit: boolean = false;

  @Input() public categoryName!: string;
  @Input() public categoryId!: number;
  @Input() public spendThisMonth!: number;

  @ViewChild('editInput') public editInput!: ElementRef;

  private static readonly lastTransactionsMaxLength = 5;

  private readonly subs = new Subject<void>();

  constructor(private readonly dialog: MatDialog,
              private readonly confirm: MatDialog,
              private readonly cardsStore: CardsStore,
              private readonly categoryService: CategoryService,
              private readonly changeDetector: ChangeDetectorRef,
              private readonly transactionsStore: TransactionsStore) {
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

  public edit_enable(): void {
    this.edit = true;
    this.changeDetector.detectChanges();
    // this.editInput.nativeElement.focus();
  }

  public edit_save(): void {
    this.categoryService.api.categoriesUpdate(this.categoryId.toString(), {
      name:  this.editInput.nativeElement.value
    }, {
      categoryId: this.categoryId
    })
      .pipe(takeUntil(this.subs))
      .subscribe(
        () => this.cardsStore.updateState(),
        () => this.cardsStore.updateState());
  }

  public edit_disable(): void {
    this.edit = false;
  }


  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
