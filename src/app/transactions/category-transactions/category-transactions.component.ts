import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import ITransaction from '../../entities/transaction.entity';

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnDestroy {

  public categoryName!: string;
  public filter = (value: ITransaction) => value.categoryName === this.categoryName;

  private readonly subs$ = new Subject<void>();

  constructor(
    route: ActivatedRoute
  ) {
    route.params
      .pipe(takeUntil(this.subs$))
      .subscribe(params => this.categoryName = params["categoryName"]);
  }

  public ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.unsubscribe();
  }

}
