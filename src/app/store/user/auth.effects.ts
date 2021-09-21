import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";

import { IError } from "../../../api/api.generated";
import { LOCALSTORAGE_USER_PATH } from "../../constants";
import IUser from "../../entities/user.entity";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { AuthActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
  public readonly logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogIn),
      switchMap(payload => this.authService.logIn(payload)
        .pipe(map((res) => res.hasOwnProperty('jwtToken')
            ? AuthActions.LogInSuccess(res as IUser)
            : AuthActions.LogInFailure(res as IError)
          )
        )
      )
    )
  );
  public readonly logInSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogInSuccess),
      tap((payload) => {
        localStorage.setItem(LOCALSTORAGE_USER_PATH, JSON.stringify(payload));
        this.router.navigate(['/wallet/categories']);
      })
    ), { dispatch: false }
  );
  public readonly logInFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogInFailure),
      tap((payload) => {
        console.error(payload);
      })
    ), { dispatch: false }
  );
  public readonly logOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogOut),
      tap(() => {
        localStorage.clear();
      })
    ), { dispatch: false }
  );
  public readonly signUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUp),
      switchMap(payload => {
          return this.userService.api.usersCreate(payload)
            .pipe(map((res) => {
                  return res.data.value
                    ? AuthActions.SignUpSuccess(res.data.value as IUser)
                    : AuthActions.SignUpFailure(res.data.error as IError);
                }
              )
            );
        }
      )
    )
  );
  public readonly signUpSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUpSuccess),
      tap(() => {
        this.router.navigate(['/sign-in']);
      })
    ), { dispatch: false }
  );
  public readonly signUpFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUpFailure),
      tap((payload) => {
        console.error(payload);
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions,
              private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }
}