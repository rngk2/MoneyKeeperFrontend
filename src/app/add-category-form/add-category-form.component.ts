import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from "rxjs";

import CategoryService from "../services/category.service";
import CategoriesStore from "../store/categories/categories.store";

@Component({
  selector: 'add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent implements OnDestroy {

  public createCategoryDialogData: { categoryName: string } = {
    categoryName: ''
  };

  private readonly categoryUtils = new CategoryService.CategoryServiceUtils();
  private readonly subs$ = new Subject<void>();

  constructor(
    private readonly dialogRef: MatDialogRef<AddCategoryFormComponent>,
    private readonly categoriesStore: CategoriesStore,
  ) {
  }

  public addCategory(): void {
    if (!this.createCategoryDialogData.categoryName) {
      return;
    }

    this.categoriesStore.createCategory({
      name: this.categoryUtils.normalizeNameString(this.createCategoryDialogData.categoryName),
    });
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.unsubscribe();
  }
}
