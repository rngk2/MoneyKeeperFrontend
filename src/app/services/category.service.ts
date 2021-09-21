import { Injectable } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject } from "rxjs";

import ApiConnector from '../../api/api.connector';
import { CategoryOverview } from "../../api/api.generated";
import { CategoriesApi } from '../../api/api.interfaces';
import { INPUT_TRANSACTION_NAME } from "../entities/transaction.entity";
import { Total } from "../store/chart/types";
import { convertToObserved, Observed } from "../utils";

class CategoryServiceUtils {
  public normalizeNameString(name: string): string {
    const sym0 = name.charAt(0);
    if (sym0 == sym0.toUpperCase()) {
      return name;
    }
    return (sym0.toUpperCase() + name.substr(1, name.length - 1)).trim();
  }

  /**
   * @param total - is total spent for each category
   * @returns {string[]} - Categories names with {Transaction:INPUT_TRANSACTION_NAME} excluded
   */
  public getCategoriesNames(total: Total): string[] {
    return Object.keys(total).filter(value =>
      value !== INPUT_TRANSACTION_NAME
    );
  }

  /**
   * @param total - is total spent for each category
   * @returns {number[]} - Spent for each category with {Transaction:INPUT_TRANSACTION_NAME} excluded
   */
  public getAmountForCategories(total: Total): number[] {
    return Object.values(total).filter((value, index) =>
      Object.keys(total)[index] !== INPUT_TRANSACTION_NAME
    );
  }

  public sortOverviewAlphabetically(array: CategoryOverview[]): CategoryOverview[] {
    array.sort((a, b) => {
      if (!a.categoryName || !b.categoryName) {
        return 0;
      }
      else if (a.categoryName < b.categoryName) {
        return -1;
      }
      else if (a.categoryName > b.categoryName) {
        return 1;
      }
      return 0;
    });
    return array;
  }
}

@UntilDestroy()
@Injectable()
export default class CategoryService {

  private _api = new BehaviorSubject<Observed<CategoriesApi> | null>(null);

  constructor(
    private readonly apiConnector: ApiConnector
  ) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.categories)));
  }

  public static get CategoryServiceUtils() {
    return CategoryServiceUtils;
  }

  public get api(): Observed<CategoriesApi> {
    return this._api.value!;
  }
}
