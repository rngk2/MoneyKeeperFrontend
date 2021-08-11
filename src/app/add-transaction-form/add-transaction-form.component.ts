import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import Transaction from "../entities/transaction.entity";
import categoriesState from "../state/categories.state";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {

  public amount!: number
  public comment!: string
  public timestampControl = new FormControl(new Date())
  public minDate = new Date(0)
  public maxDate = new Date();

  @Input() public categoryId!: number

  constructor(private readonly httpClient: HttpClient) { }

  public submit(): void {
    this.httpClient.post<Transaction>(environment.serverUrl + '/transactions', {
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestampControl.value,
      comment: this.comment
    }).subscribe(() => categoriesState.updateState())
  }
}
