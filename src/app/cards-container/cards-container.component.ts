import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import Transaction from '../entities/transaction.entity';
import UserService from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCategoryFormComponent} from '../add-category-form/add-category-form.component';
import {BASE_SERVER_URL} from '../app.config';
import CardsContainerStore from '../store/cards-store/cards-container.store';
import {AddEarningFormComponent} from '../transactions/add-earning-form/add-earning-form.component';
import {BehaviorSubject, Subject} from 'rxjs';
import TransactionService from '../services/transaction.service';
import CategoryService from '../services/category.service';
import {TransactionDto} from '../../api/api.generated';
import {takeUntil} from "rxjs/operators";
import CacheService from "../services/cache.service";
import {CACHE_TRANSACTIONS_PATH} from "../constants";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit, OnDestroy {

  public category_transactions = new BehaviorSubject(new Map<string, TransactionDto[]>());
  public categoriesNames = new BehaviorSubject<string[]>([]);
  public amountForCategories = new BehaviorSubject<number[]>([]);
  public isFetched = false;

  private readonly subs = new Subject<void>();

  constructor(private readonly dialog: MatDialog,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly cardsStore: CardsContainerStore,
              private readonly transactionsService: TransactionService,
              private readonly categoryService: CategoryService,
              private readonly cache: CacheService) { }

  public ngOnInit(): void {
    this.category_transactions
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.categoriesNames.next(this.getCategoriesNames());
        this.amountForCategories.next(this.getAmountForCategories(this.getCategoriesNames()));
    });

    this.cardsStore.getState()
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.fetchSummary();
      });

    if (this.cache.isFresh(CACHE_TRANSACTIONS_PATH)) {
      this.fetchSummary_cached();
      return;
    }

    this.fetchSummary();
  }

  public fetchSummary(): void {
    this.userService.api.summaryList()
      .pipe(takeUntil(this.subs))
      .subscribe(res => {
        this.cache.save<TransactionDto[] | Transaction[]>(CACHE_TRANSACTIONS_PATH, res.data);
        this.summarize(res.data);
      });
  }

  private fetchSummary_cached(): void {
    this.summarize(this.cache.get<Transaction[] | TransactionDto[]>(CACHE_TRANSACTIONS_PATH)!);
  }

  private summarize(transactions: Transaction[] | TransactionDto[]): void {
    let category_transactions = new Map<string, TransactionDto[]>();
    for (const transaction of transactions) {
      if (transaction.categoryName === Transaction.inputTransactionName) {
        continue;
      }
      const containedTransactions = category_transactions.get(transaction.categoryName!);
      const newSet: TransactionDto[] = containedTransactions == null ? [transaction]
        : [...containedTransactions, transaction];
      category_transactions.set(transaction.categoryName!, newSet);
    }
    this.category_transactions.next(category_transactions);
    this.isFetched = true;
  }

  public calculateAmountForMonth(transactions: Transaction[] | TransactionDto[]): number {
    return this.transactionsService.utils.calculateAmountForMonth(transactions);
  }

  public getCategoriesNames(): string[] {
    return this.categoryService.utils.extractCategoriesNames(this.category_transactions.value);
  }

  public getAmountForCategories(categories: string[]): number[] {
    let amountForCategories: number[] = [];
    for (let category of categories)
      amountForCategories.push(this.getAmountForCategory(category));

    return amountForCategories;
  }

  private getAmountForCategory(categoryName: string): number {
    return this.transactionsService.utils.getSumForTransactions(
      this.category_transactions.value.get(categoryName)!
    );
  }

  public addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryFormComponent, {
      width: '40rem'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
    });
  }

  public addEarning(): void {
    const dialogRef = this.dialog.open(AddEarningFormComponent, {
      width: '40rem'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cardsStore.updateState();
      document.getElementById('add-btn')!.blur();
    });
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
