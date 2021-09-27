import { Injectable } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject } from "rxjs";

import ApiConnector from '../../api/api.connector';
import { CategoriesApi } from '../../api/api.interfaces';
import { convertToObserved, Observed } from "../utils";

class CategoryServiceUtils {
  public normalizeNameString(name: string): string {
    const sym0 = name.charAt(0);
    if (sym0 == sym0.toUpperCase()) {
      return name;
    }
    return (sym0.toUpperCase() + name.substr(1, name.length - 1)).trim();
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
