import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../environments/environment";
import Category from "../entities/category.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import CategoriesState from "../state/categories.state";

interface DialogData {
  categoryName: string
}

@Component({
  selector: 'add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent {

  data: DialogData = {
    categoryName: ''
  }

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddCategoryFormComponent>
    ) {}

  addCategory(): void {
    if (!this.data.categoryName)
      return

    this.dialogRef.close()
    this.httpClient.post<Category>(environment.serverUrl + '/categories', {
      name:  this.data.categoryName,
      userId: this.userService.getCurrentUser().id
    }).subscribe(res => CategoriesState.updateState())
  }

}
