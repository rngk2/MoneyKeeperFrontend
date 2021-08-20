import {Component, Inject, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Transaction from "../../entities/transaction.entity";
import {FormControl} from "@angular/forms";
import {BASE_SERVER_URL} from "../../app.config";
import CardsContainerStore from "../../store/cards-store/cards-container.store";
import UserService from "../../services/user.service";
import TransactionService from "../../services/transaction.service";

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

  constructor(private readonly cardsStore: CardsContainerStore,
              private readonly userService: UserService,
              private readonly transactionService: TransactionService) { }

  public addTransaction(): void {
    this.transactionService.createTransaction({
    userId: this.userService.getCurrentUser().id,
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestampControl.value,
      comment: this.comment
    }).subscribe(() => this.cardsStore.updateState())
  }
}
