import {Component, Input, OnInit} from '@angular/core';
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
  amount = 0
  timestamp = new Date()

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  submit(): void {
    console.log({a: this.amount, t: this.timestamp.toDateString(), t2: this.timestamp.toISOString()})
    this.httpClient.post<Transaction>(environment.serverUrl + '/transactions', {
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestamp
    }).subscribe(res => categoriesState.updateState())
  }
}
