import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import UserService from '../../services/user.service';
import CardsContainerStore from '../../store/cards-store/cards-container.store';
import CategoryService from '../../services/category.service';
import Transaction from "../../entities/transaction.entity";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss']
})
export class AddEarningFormComponent implements OnDestroy {

  public earningsId!: number;

  private readonly subs = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<AddEarningFormComponent>,
              private readonly userService: UserService,
              private readonly cardsStore: CardsContainerStore,
              private readonly categoryService: CategoryService) {
    this.categoryService.api.categoriesList()
      .pipe(takeUntil(this.subs))
      .subscribe(res => {
        const categories = res.data.value;
        const e_index = categories.findIndex((value: { name: string }) => value.name === Transaction.inputTransactionName);
        this.earningsId = categories[e_index].id;
      });
  }

  public onSubmit(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
