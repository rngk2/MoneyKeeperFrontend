import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess} from "./user.actions";
import {map, switchMap, tap} from "rxjs/operators";
import AuthService from "../../services/auth.service";
import User from "../../entities/user.entity";
import {Router} from "@angular/router";

@Injectable()
export default class AuthEffects {
  constructor(private actions$: Actions,
              private readonly authService: AuthService,
              private readonly router: Router) { }

  public readonly logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => this.authService.logIn(payload)
        .pipe(map(res => res.hasOwnProperty('id')
          ? new LogInSuccess(res as User)
          : new LogInFailure(res as {error: string})
          )
        )
      )
    )
  );

  public readonly logInSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((action: LogInSuccess) => {
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        this.router.navigate(['/wallet/categories']);
      })
    ), {dispatch: false}
  );

  public readonly logInFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE),
      tap((action: LogInFailure) => {
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
    ), {dispatch: false}
  );

}
