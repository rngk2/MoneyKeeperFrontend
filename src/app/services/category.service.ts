import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import Category from "../entities/category.entity";
import {BASE_SERVER_URL} from "../app.config";
import UserService from "./user.service";
import {Observable} from "rxjs";
import Transaction from "../entities/transaction.entity";
import {TransactionDto} from "../../gen/myApi";

@Injectable()
export default class CategoryService {

  constructor(private readonly http: HttpClient,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly userService: UserService) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.serverUrl +
        `/Categories/user/${this.userService.getCurrentUser().id}`)
  }

  public createCategory(categoryName: string): Observable<Category> {
    return this.http.post<Category>(this.serverUrl + '/categories', {
      name:  CategoryService.normalizeNameString(categoryName),
      userId: this.userService.getCurrentUser().id
    })
  }

  public deleteCategory(id: number) {
    return this.http.delete(this.serverUrl + `/categories/${id}`)
  }

  private static normalizeNameString(name: string): string {
    const sym0 = name.charAt(0)
    if (sym0 == sym0.toUpperCase())
      return name
    return sym0.toUpperCase() + name.substr(1, name.length - 1)
  }

  public extractCategoriesNames(category_transactions: Map<string, TransactionDto[]>): string[] {
    return [...category_transactions.keys()].filter(key => {
      const transactions = category_transactions.get(key)!
      return !(transactions.length === 0 || (transactions.length === 1 && transactions[0].amount === 0))
    })
  }

}
