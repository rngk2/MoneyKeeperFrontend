import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import Category from "../entities/category.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import CategoriesState from "../state/categories.state";
import {BASE_SERVER_URL} from "../app.config";

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

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService,
              private readonly dialogRef: MatDialogRef<AddCategoryFormComponent>,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string) {}

  public addCategory(): void {
    if (!this.data.categoryName)
      return

    this.dialogRef.close()
    this.httpClient.post<Category>(this.serverUrl + '/categories', {
      name:  this.data.categoryName,
      userId: this.userService.getCurrentUser().id
    }).subscribe(res => CategoriesState.updateState())
  }
}
