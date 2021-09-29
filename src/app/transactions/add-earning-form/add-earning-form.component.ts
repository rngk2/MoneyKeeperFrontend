import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from "rxjs";
import ICategory from "../../entities/category.entity";
import CategoriesStore from "../../store/categories/categories.store";

@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEarningFormComponent {

  public earningsId: Observable<ICategory | undefined>;

  constructor(
    private readonly dialogRef: MatDialogRef<AddEarningFormComponent>,
    public readonly categoriesStore: CategoriesStore,
  ) {
    this.earningsId = categoriesStore.earnings;
    this.categoriesStore.fetchCategories();
  }

  public onSubmit(): void {
    this.dialogRef.close();
  }
}
