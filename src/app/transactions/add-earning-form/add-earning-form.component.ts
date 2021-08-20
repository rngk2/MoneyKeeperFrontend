import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {BASE_SERVER_URL} from "../../app.config";
import UserService from "../../services/user.service";
import Category from "../../entities/category.entity";
import Transaction from "../../entities/transaction.entity";
import CardsContainerStore from "../../store/cards-store/cards-container.store";
import CategoryService from "../../services/category.service";
import TransactionService from "../../services/transaction.service";

@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss']
})
export class AddEarningFormComponent {

  public timestampControl = new FormControl(new Date())
  public minDate = new Date(0)
  public maxDate = new Date()
  public amount!: number
  public comment!: string;

  constructor(private readonly dialogRef: MatDialogRef<AddEarningFormComponent>,
              private readonly userService: UserService,
              private readonly cardsStore: CardsContainerStore,
              private readonly categoryService: CategoryService,
              private readonly transactionService: TransactionService) { }

  public addEarning(): void {
    this.categoryService.getCategories()
    .subscribe(categories => {
        const e_index: number = categories.findIndex(value => value.name === 'Earnings')
        this.transactionService.createTransaction({
          userId: this.userService.getCurrentUser().id,
          categoryId: categories[e_index].id,
          amount: this.amount,
          timestamp: this.timestampControl.value,
          comment: this.comment
        }).subscribe(() => {
          this.cardsStore.updateState()
        })
      })
    this.dialogRef.close()
  }
}
