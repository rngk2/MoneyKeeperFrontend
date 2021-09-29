import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from "@ngneat/until-destroy";

import ITransaction from '../../entities/transaction.entity';

@UntilDestroy()
@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTransactionsComponent {

  public categoryName!: string;
  public readonly filter = (value: ITransaction) => value.categoryName === this.categoryName;

  constructor(
    route: ActivatedRoute
  ) {
    route.params.subscribe(params => this.categoryName = params["categoryName"]);
  }
}
