import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import CardsContainerStore from '../../store/cards-store/cards-container.store';
import UserService from '../../services/user.service';
import TransactionService from '../../services/transaction.service';

@Component({
  selector: 'add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {

  public amount!: number;
  public comment!: string;
  public timestampControl = new FormControl(new Date());
  public minDate = new Date(0);
  public maxDate = new Date();

  @Input() public categoryId!: number;

  constructor(private readonly cardsStore: CardsContainerStore,
              private readonly userService: UserService,
              private readonly transactionService: TransactionService) {
  }

  public addTransaction(): void {
    (this.transactionService.api.transactionsCreate({
      userId: this.userService.currentUserService.getCurrentUser()?.id!,
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestampControl.value,
      comment: this.comment
    })).subscribe(() => this.cardsStore.updateState());
  }
}
