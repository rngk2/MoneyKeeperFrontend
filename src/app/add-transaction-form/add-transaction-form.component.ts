import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import Transaction from "../entities/transaction.entity";
import UserService from "../services/user.service";
import categoriesState from "../state/categories.state";

@Component({
  selector: 'add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {

  @Input() categoryId!: number
  amount!: number
  comment!: string
  timestamp = new Date()

  constructor(private httpClient: HttpClient) { }

  submit(): void {
    this.httpClient.post<Transaction>(environment.serverUrl + '/transactions', {
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestamp,
      comment: this.comment
    }).subscribe(() => categoriesState.updateState())
  }
}
