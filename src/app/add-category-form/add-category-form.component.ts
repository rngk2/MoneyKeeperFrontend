import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import UserService from '../services/user.service';
import CardsContainerStore from '../store/cards-store/cards-container.store';
import CategoryService from '../services/category.service';
import CacheService from '../services/cache.service';
import {CACHE_TRANSACTIONS_PATH, PROFILE_PAGE_CACHE_FRESH_CHECK_PATH} from "../constants";

interface DialogData {
  categoryName: string
}

@Component({
  selector: 'add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent {

  public data: DialogData = {
    categoryName: ''
  }

  constructor(private readonly dialogRef: MatDialogRef<AddCategoryFormComponent>,
              private readonly cardsStore: CardsContainerStore,
              private readonly categoryService: CategoryService,
              private readonly userService: UserService,
              private readonly cache: CacheService) { }

  public addCategory(): void {
    if (!this.data.categoryName)
      return

    this.categoryService.api.categoriesCreate({
      name: this.categoryService.utils.normalizeNameString(this.data.categoryName),
      userId: this.userService.currentUserService.getCurrentUser()?.id!
    }).subscribe(res => {
      if (!res.error) {
        this.cache.remove(PROFILE_PAGE_CACHE_FRESH_CHECK_PATH);
        this.cache.remove(CACHE_TRANSACTIONS_PATH);
        this.cardsStore.updateState()
      }
    })

    this.dialogRef.close()
  }
}
