import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CardsActions} from "./cards.actions";
import {map, switchMap, tap} from "rxjs/operators";
import UserService from "../../services/user.service";
import {IError, TransactionDto} from "../../../api/api.generated";
import {Summary} from "./types";
import CacheService from "../../services/cache.service";
import {CACHE_SUMMARY_PATH} from "../../constants";
import TransactionService from "../../services/transaction.service";

@Injectable()
export class CardsEffects {

  constructor(private readonly actions$: Actions,
              private readonly userService: UserService,
              private readonly cache: CacheService,
              private readonly transactionsService: TransactionService) { }

  public readonly fetchSummary = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.FetchSummary),
      switchMap(() => this.transactionsService.api.summaryList()
        .pipe(map(res => {
          if (!res.data.error) {
            this.cache.save<TransactionDto>(CACHE_SUMMARY_PATH, res.data.value);
            return CardsActions.FetchSuccess({cards: res.data.value});
          }
          return CardsActions.FetchFailed({error: res.data.error});
          }
        ))
      )
    )
  );

  public readonly fetchFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.FetchFailed),
      tap((error) => console.error(error))
    ), {dispatch: false}
  );
}
