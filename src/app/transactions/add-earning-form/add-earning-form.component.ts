import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {BASE_SERVER_URL} from "../../app.config";
import UserService from "../../services/user.service";
import Category from "../../entities/category.entity";
import Transaction from "../../entities/transaction.entity";
import CardsContainerStore from "../../store/cards-store/cards-container.store";

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
              private readonly http: HttpClient,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly userService: UserService,
              private readonly cardsStore: CardsContainerStore) { }

  public submit(): void {
    this.http.get<Category[]>(this.serverUrl + `/Categories/user/${this.userService.getCurrentUser().id}`)
      .subscribe(categories => {
        const e_index: number = categories.findIndex(value => value.name === 'Earnings')
        this.http.post<Transaction>(this.serverUrl + '/transactions', {
          categoryId: categories[e_index].id,
          amount: this.amount,
          timestamp: this.timestampControl.value,
          comment: this.comment
        }).subscribe(() => {
          this.cardsStore.updateState()
          this.dialogRef.close()
        })
      })
  }
}
