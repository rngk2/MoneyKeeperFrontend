import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import UserService from '../services/user.service';
import CardsStore from '../store/cards/cards.store';
import CategoryService from '../services/category.service';
import CacheService from '../services/cache.service';
import {CACHE_TRANSACTIONS_PATH} from "../constants";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

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
              private readonly categoryService: CategoryService,
              private readonly userService: UserService,
              private readonly cache: CacheService) {
  }

  public addCategory(): void {
    if (!this.data.categoryName) {
      return;
    }

    this.categoryService.api.categoriesCreate({
        name: this.categoryService.utils.normalizeNameString(this.data.categoryName),
      }).pipe(takeUntil(this.subs))
        .subscribe(res => {
          if (!res.data.error) {
            this.cache.remove(CACHE_TRANSACTIONS_PATH);
            this.cardsStore.updateState();
          }
        });

    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
