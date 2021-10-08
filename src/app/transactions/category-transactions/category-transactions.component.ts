import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ITransaction from '../../entities/transaction.entity';

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTransactionsComponent {

  public readonly categoryName: string;
  public readonly filter = (value: ITransaction) => value.categoryName === this.categoryName;

  constructor(route: ActivatedRoute) {
    this.categoryName = route.snapshot.params['categoryName'];
  }
}
