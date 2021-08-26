import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import UserService from '../../services/user.service';
import CardsContainerStore from '../../store/cards-store/cards-container.store';
import CategoryService from '../../services/category.service';
import TransactionService from '../../services/transaction.service';

@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss']
})
export class AddEarningFormComponent {

  public timestampControl = new FormControl(new Date());
  public minDate = new Date(0);
  public maxDate = new Date();
  public amount!: number;
  public comment!: string;

  constructor(private readonly dialogRef: MatDialogRef<AddEarningFormComponent>,
              private readonly userService: UserService,
              private readonly cardsStore: CardsContainerStore,
              private readonly categoryService: CategoryService,
              private readonly transactionService: TransactionService) {
  }

  public addEarning(): void {
    this.categoryService.api.categoriesList()
      .subscribe(response => {
        const categories = response.data;
        const e_index: number = categories.findIndex((value: { name: string }) => value.name === 'Earnings');
        (this.transactionService.api.transactionsCreate({
          userId: this.userService.currentUserService.getCurrentUser()?.id!,
          categoryId: categories[e_index].id!,
          amount: this.amount,
          timestamp: this.timestampControl.value,
          comment: this.comment
        })).subscribe(() => {
          this.cardsStore.updateState();
        });
      });
    this.dialogRef.close();
  }
}
