import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import CardsContainerStore from '../../store/cards-store/cards-container.store';
import UserService from '../../services/user.service';
import TransactionService from '../../services/transaction.service';
import CacheService from '../../services/cache.service'
import {ProfilePageComponent} from '../../profile-page/profile-page.component'

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
              private readonly transactionService: TransactionService,
              private readonly cache: CacheService) {
  }

  public addTransaction(): void {
    this.transactionService.api.transactionsCreate({
      userId: this.userService.currentUserService.getCurrentUser()?.id!,
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestampControl.value,
      comment: this.comment
    }).subscribe(() => {
      this.cache.remove(ProfilePageComponent.PROFILE_PAGE_CACHE_FRESH_CHECK_PATH);
      this.cardsStore.updateState()
    });
  }
}
