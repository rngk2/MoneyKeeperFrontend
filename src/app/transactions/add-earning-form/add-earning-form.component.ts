import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { INPUT_TRANSACTION_NAME } from "../../entities/transaction.entity";
import CategoryService from '../../services/category.service';

@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss']
})
export class AddEarningFormComponent implements OnDestroy {

  public earningsId!: number;

  private readonly subs$ = new Subject<void>();

  constructor(
    private readonly dialogRef: MatDialogRef<AddEarningFormComponent>,
    private readonly categoryService: CategoryService
  ) {
    this.categoryService.api.categoriesList()
      .pipe(takeUntil(this.subs$))
      .subscribe(res => {
        const categories = res.data.value;
        const e_index = categories.findIndex((value: { name: string }) => value.name === INPUT_TRANSACTION_NAME);
        this.earningsId = categories[e_index].id;
      });
  }

  public onSubmit(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.unsubscribe();
  }
}
