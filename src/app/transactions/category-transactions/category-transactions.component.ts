import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import Transaction from '../../entities/transaction.entity'

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent {

  public categoryName!: string;
  public filter = (value: Transaction) => value.categoryName === this.categoryName;

  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => this.categoryName = params["cname"])
  }
}
