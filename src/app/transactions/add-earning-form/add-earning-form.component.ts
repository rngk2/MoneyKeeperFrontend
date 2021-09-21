import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from "@ngneat/until-destroy";

import { INPUT_TRANSACTION_NAME } from "../../entities/transaction.entity";
import CategoryService from '../../services/category.service';

@UntilDestroy()
@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss']
})
export class AddEarningFormComponent {

  public earningsId!: number;

  constructor(
    private readonly dialogRef: MatDialogRef<AddEarningFormComponent>,
    private readonly categoryService: CategoryService
  ) {
    this.categoryService.api.categoriesList()
      .subscribe(res => {
        const categories = res.data.value;
        const e_index = categories.findIndex((value: { name: string }) => value.name === INPUT_TRANSACTION_NAME);
        this.earningsId = categories[e_index].id;
      });
  }

  public onSubmit(): void {
    this.dialogRef.close();
  }
}
