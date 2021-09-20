import {Inject, Injectable} from '@angular/core';
import {BASE_SERVER_URL} from '../app.config';
import {TransactionDto} from '../../api/api.generated';
import {CategoriesApi} from '../../api/api.interfaces';
import ApiConnector from '../../api/api.connector';
import {BehaviorSubject} from "rxjs";
import {convertToObserved, Observed} from "../utils/Utils";
import Transaction from "../entities/transaction.entity";

class CategoryServiceUtils {
  public normalizeNameString(name: string): string {
    const sym0 = name.charAt(0);
    if (sym0 == sym0.toUpperCase())
      return name;
    return (sym0.toUpperCase() + name.substr(1, name.length - 1)).trim();
  }

  public extractCategoriesNames(category_transactions: Map<string, TransactionDto[]>): string[] {
    return [...category_transactions.keys()].filter(key => {
      const transactions = category_transactions.get(key)!;
      return !(transactions.length === 0 || (transactions.length === 1 && transactions[0].amount === 0));
    });
  }

  /**
   * @param total - is total spent for each category
   * @returns {string[]} - Categories names with {Transaction.inputTransactionName} excluded
   */
  public getCategoriesNames(total: Record<string, number>): string[] {
    return Object.keys(total).filter(value =>
      value !== Transaction.inputTransactionName
    );
  }

  /**
   * @param total - is total spent for each category
   * @returns {number[]} - Spent for each category with {Transaction.inputTransactionName} excluded
   */
  public getAmountForCategories(total: Record<string, number>): number[] {
    return Object.values(total).filter((value, index) =>
      Object.keys(total)[index] !== Transaction.inputTransactionName
    );
  }
}

@Injectable()
export default class CategoryService {

  private _api = new BehaviorSubject<Observed<CategoriesApi> | null>(null)
  public readonly utils: CategoryServiceUtils = new CategoryServiceUtils();

  constructor(@Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly apiConnector: ApiConnector) {
    apiConnector.api.subscribe(value => this._api.next(convertToObserved(value.categories)));
  }

  public get api(): Observed<CategoriesApi> {
    return this._api.value!
  }
};
