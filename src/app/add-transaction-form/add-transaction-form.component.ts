import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import Transaction from "../entities/transaction.entity";
import UserService from "../services/user.service";
import categoriesState from "../state/categories.state";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {

  @Input() categoryId!: number
  amount!: number
  comment!: string
  timestampControl = new FormControl(new Date())
  minDate = new Date(0)
  maxDate = new Date();

  constructor(private readonly httpClient: HttpClient) { }

  submit(): void {
    this.httpClient.post<Transaction>(environment.serverUrl + '/transactions', {
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestampControl.value,
      comment: this.comment
    }).subscribe(() => categoriesState.updateState())
  }
}
