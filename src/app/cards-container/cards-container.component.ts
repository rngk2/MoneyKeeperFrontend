import {Component, Inject, OnInit} from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryFormComponent} from "../add-category-form/add-category-form.component";
import {BASE_SERVER_URL} from "../app.config";
import CardsContainerStore from "../store/cards-store/cards-container.store";

@Component({
  selector: 'cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  public category_transactions = new Map<string, Transaction[]>()
  public isFetched = false

  constructor(private readonly dialog: MatDialog,
              private readonly http: HttpClient,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly cardsStore: CardsContainerStore) {
  }

  public ngOnInit(): void {
    this.cardsStore.getState().subscribe(() => this.fetchSummary())
    this.cardsStore.updateState()
  }

  public fetchSummary(): void {
     this.http.get<Transaction[]>(this.serverUrl + `/users/${this.userService.getCurrentUser().id}/summary/month`)
      .subscribe(transactions => {
        this.category_transactions = new Map<string, Transaction[]>()

        for (const transaction of transactions) {
          const containedTransactions = this.category_transactions.get(transaction.categoryName!)
          const newSet: Transaction[] = containedTransactions == null ? [transaction]
            : [...containedTransactions, transaction]
          this.category_transactions.set(transaction.categoryName!, newSet)
        }
        this.isFetched = true
      })
  }

  public calculateAmount(transactions: Transaction[]): number {
    let amount = 0
    for (const transaction of transactions)
      amount += transaction.amount

    return amount
  }

  public getCategoriesNames(): string[] {
    return [...this.category_transactions.keys()]
  }

  public getAmountForCategories(categories: string[]): number[] {
    let amountForCategories: number[] = []
    for (let category of categories)
      amountForCategories.push(<number>this.getAmountForCategory(category))

    return amountForCategories
  }

  private getAmountForCategory(categoryName: string): number | undefined {
    return this.category_transactions.get(categoryName)?.map(t => t.amount)
      .reduce((acc, curr) => acc + curr)
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
}
