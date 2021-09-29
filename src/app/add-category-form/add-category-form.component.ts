import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import CategoryService from "../services/category.service";
import CategoriesStore from "../store/categories/categories.store";

@Component({
  selector: 'add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryFormComponent {

  public createCategoryDialogData: { categoryName: string } = {
    categoryName: ''
  };

  private readonly categoryUtils = new CategoryService.CategoryServiceUtils();

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
}
