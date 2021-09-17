import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import Transaction from '../entities/transaction.entity';
import UserService from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCategoryFormComponent} from '../add-category-form/add-category-form.component';
import {BASE_SERVER_URL} from '../app.config';
import CardsStore from '../store/cards/cards.store';
import {AddEarningFormComponent} from '../transactions/add-earning-form/add-earning-form.component';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import TransactionService from '../services/transaction.service';
import CategoryService from '../services/category.service';
import {CategoryOverview, OrderType, TransactionDto, TransactionField} from '../../api/api.generated';
import {take, takeUntil} from "rxjs/operators";
import CacheService from "../services/cache.service";
import {CACHE_TRANSACTIONS_PATH} from "../constants";
import {RangeOffsetController} from "../transactions/transactions-list/transactions-list.component";
import {Range} from "../utils/Utils";
import TransactionsStore from "../store/transactions/transactions.store";
import CategoriesStore from "../store/categories/categories.store";
import ChartStore from "../store/chart/chart.store";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit, OnDestroy {

  //public category_transactions = new BehaviorSubject<CategoryOverview[]>([]);
  public categoriesNames = new BehaviorSubject<string[]>([]);
  public amountForCategories = new BehaviorSubject<number[]>([]);
  public isFetched = false;

  public overview = new BehaviorSubject<CategoryOverview[]>([]);

  private range = new RangeOffsetController(0, 10);

  private readonly subs = new Subject<void>();

  public names = new BehaviorSubject<string[]>([]);
  public amount = new BehaviorSubject<number[]>([]);


  constructor(private readonly dialog: MatDialog,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly cardsStore: CardsStore,
              private readonly transactionsService: TransactionService,
              private readonly categoryService: CategoryService,
              private readonly cache: CacheService,
              private readonly transactionsStore: TransactionsStore,
              private readonly categoriesStore: CategoriesStore,
              private readonly chartStore: ChartStore,
              /*private changeDetector: ChangeDetectorRef*/) {
    this.categoriesStore.overview
      .pipe(takeUntil(this.subs))
      .subscribe(value => {
        this.overview = new BehaviorSubject(value.filter(o => o.categoryName !== Transaction.inputTransactionName))
        this.isFetched = true;
      });
  }

  public checkFetch(): boolean {
    return this.isFetched && this.overview.value.length < 1;
  }

  public ngOnInit(): void {
    this.chartStore.total
      .pipe(takeUntil(this.subs))
      .subscribe(value => {
        if (value) {
          this.categoriesNames.next(this.categoriesStore.getCategoriesNames(value));
          this.amountForCategories.next(this.categoriesStore.getAmountForCategories(value));
        }
      });

    this.overview
      .pipe(takeUntil(this.subs))
      .subscribe(() => this.buildChart())
    // this.category_transactions
    //   .pipe(takeUntil(this.subs))
    //   .subscribe(() => {
    //     this.categoriesNames.next(this.getCategoriesNames());
    //     this.amountForCategories.next(this.getAmountForCategories(this.getCategoriesNames()));
    // });
    this.fetchSummary(this.range.getNextRange());
  }

  public buildChart(): void {
    this.chartStore.fetchTotal();
  }

  public fetchSummary(range: Range): void {
    this.categoriesStore.fetchOverview({
      from: range.begin,
      to: range.end,
    });
  }

  // private fetchSummary_cached(): void {
  //   this.summarize(this.cache.get<Transaction[] | TransactionDto[]>(CACHE_TRANSACTIONS_PATH)!);
  // }

  // private summarize(transactions: Transaction[] | TransactionDto[]): void {
  //   if (!transactions) {
  //     return;
  //   }
  //   let category_transactions = new Map<string, TransactionDto[]>();
  //   for (const transaction of transactions) {
  //     if (transaction.categoryName === Transaction.inputTransactionName) {
  //       continue;
  //     }
  //     const containedTransactions = category_transactions.get(transaction.categoryName!);
  //     const newSet: TransactionDto[] = containedTransactions == null ? [transaction]
  //       : [...containedTransactions, transaction];
  //     category_transactions.set(transaction.categoryName!, newSet);
  //   }
  //   this.category_transactions.next(category_transactions);
  //   this.isFetched = true;
  // }

  // public calculateAmountForMonth(transactions: Transaction[] | TransactionDto[]): number {
  //   return this.transactionsService.utils.calculateAmountForMonth(transactions);
  // }
  //
  // public getCategoriesNames(): string[] {
  //   return this.categoryService.utils.extractCategoriesNames(this.category_transactions.value);
  // }

  // public getAmountForCategories(categories: string[]): number[] {
  //   let amountForCategories: number[] = [];
  //   for (let category of categories)
  //     amountForCategories.push(this.getAmountForCategory(category));
  //
  //   return amountForCategories;
  // }
  //
  // private getAmountForCategory(categoryName: string): number {
  //   return this.transactionsService.utils.getSumForTransactions(
  //     this.category_transactions.value.get(categoryName)!
  //   );
  // }

  public addCategory(): void {
    this.dialog.open(AddCategoryFormComponent, {
      width: '40rem'
    }).afterClosed()
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
    });
  }

  public addEarning(): void {
    this.dialog.open(AddEarningFormComponent, {
      width: '40rem'
    }).afterClosed()
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        document.getElementById('add-btn')!.blur();
    });
  }

  public onScroll(): void {
    // TODO: fix scroll event
    console.log('scroll')
    this.fetchSummary(this.range.getNextRange());
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
