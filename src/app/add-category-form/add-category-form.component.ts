import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import UserService from '../services/user.service';
import CardsStore from '../store/cards/cards.store';
import CacheService from '../services/cache.service';
import {Subject} from "rxjs";
import CategoriesStore from "../store/categories/categories.store";

interface DialogData {
  categoryName: string
}

@Component({
  selector: 'add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent implements OnDestroy {

  public data: DialogData = {
    categoryName: ''
  };

  private readonly subs = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<AddCategoryFormComponent>,
              private readonly cardsStore: CardsStore,
              private readonly userService: UserService,
              private readonly cache: CacheService,
              private readonly categoriesStore: CategoriesStore) {
  }

  public addCategory(): void {
    if (!this.data.categoryName) {
      return;
    }

    this.categoriesStore.createCategory({
        name: this.categoriesStore.normalizeNameString(this.data.categoryName),
    });
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
