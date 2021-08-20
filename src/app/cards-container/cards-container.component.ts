import {Component, Inject, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryFormComponent} from "../add-category-form/add-category-form.component";
import {BASE_SERVER_URL} from "../app.config";
import CardsContainerStore from "../store/cards-store/cards-container.store";
import {AddEarningFormComponent} from "../transactions/add-earning-form/add-earning-form.component";
import {BehaviorSubject, Subject} from "rxjs";
import TransactionService from "../services/transaction.service";
import CategoryService from "../services/category.service";
import {Api, TransactionDto} from "../../gen/myApi";
import {fromPromise} from "rxjs/internal-compatibility";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  public category_transactions = new BehaviorSubject(new Map<string, TransactionDto[]>())
  public categoriesNames = new Subject<string[]>()
  public amountForCategories = new Subject<number[]>()
  public isFetched = false

  constructor(private readonly dialog: MatDialog,
              private readonly http: HttpClient,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly cardsStore: CardsContainerStore,
              private readonly transactionsService: TransactionService,
              private readonly categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.category_transactions.subscribe(() => {
      this.categoriesNames.next(this.getCategoriesNames())
      this.amountForCategories.next(this.getAmountForCategories(this.getCategoriesNames()))
    })
    this.cardsStore.getState().subscribe(() => this.fetchSummary())
    this.cardsStore.updateState()
  }

  public fetchSummary(): void {
    fromPromise(new Api().users.summaryList())
      .subscribe(transactions => {
        let category_transactions = new Map<string, TransactionDto[]>()

        for (const transaction of transactions.data) {
          if (transaction.categoryName === Transaction.inputTransactionName)
              continue
          const containedTransactions = category_transactions.get(transaction.categoryName!)
          const newSet: TransactionDto[] = containedTransactions == null ? [transaction]
            : [...containedTransactions, transaction]
          category_transactions.set(transaction.categoryName!, newSet)
        }
        this.category_transactions.next(category_transactions)
        this.isFetched = true
      })
  }

  public calculateAmountForMonth(transactions: Transaction[]): number {
    return this.transactionsService.calculateAmountForMonth(transactions)
  }

  public getCategoriesNames(): string[] {
    return this.categoryService.extractCategoriesNames(this.category_transactions.value)
  }

  public getAmountForCategories(categories: string[]): number[] {
    let amountForCategories: number[] = []
    for (let category of categories)
      amountForCategories.push(this.getAmountForCategory(category))

    return amountForCategories
  }

  private getAmountForCategory(categoryName: string): number {
    return this.transactionsService.getSumForTransactions(
      this.category_transactions.value.get(categoryName)!
    )
  }

  public addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryFormComponent, {
      width: '40rem'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.cardsStore.updateState()
      document.getElementById("add-btn")!.blur();
    })
  }

  public addEarning(): void {
    const dialogRef = this.dialog.open(AddEarningFormComponent, {
      width: '40rem'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.cardsStore.updateState()
      document.getElementById("add-btn")!.blur();
    })
  }
}
