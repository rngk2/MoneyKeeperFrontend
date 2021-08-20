import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import Category from "../entities/category.entity";
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import UserService from "../services/user.service";
import {BASE_SERVER_URL} from "../app.config";
import CardsContainerStore from "../store/cards-store/cards-container.store";
import CategoryService from "../services/category.service";

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
              private readonly categoryService: CategoryService) {}

  public addCategory(): void {
    if (!this.data.categoryName)
      return

    this.categoryService.createCategory(this.data.categoryName)
      .subscribe(() => null, err => {
        if (err.code === HttpStatusCode.Ok)
          this.cardsStore.updateState()
      })

    this.dialogRef.close()
  }
}
