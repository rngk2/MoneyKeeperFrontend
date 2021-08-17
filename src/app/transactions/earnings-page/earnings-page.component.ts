import {Component} from '@angular/core';
import Transaction from "../../entities/transaction.entity";

@Component({
  selector: 'earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss']
})
export class EarningsPageComponent {
  public filter = (value: Transaction) => value.categoryName === Transaction.inputTransactionName
}
