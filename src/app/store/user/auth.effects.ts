import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap, tap} from "rxjs/operators";
import AuthService from "../../services/auth.service";
import User from "../../entities/user.entity";
import {Router} from "@angular/router";
import {IError} from "../../../api/api.generated";
import {LOCALSTORAGE_USER_PATH} from "../../constants";
import {AuthActions} from "./auth.actions";
import UserService from "../../services/user.service";

@Injectable()
export default class AuthEffects {
  constructor(private actions$: Actions,
              private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly router: Router) { }

  public readonly logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogIn),
      switchMap(payload => this.authService.logIn(payload)
        .pipe(map((res) => res.hasOwnProperty('jwtToken')
          ? AuthActions.LogInSuccess(res as User)
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
    ), {dispatch: false}
  );

  public readonly logInFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogInFailure),
      tap((payload) => {
        console.error(payload);
      })
    ), {dispatch: false}
  );

  public readonly logOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogOut),
      tap(() => {
        localStorage.removeItem(LOCALSTORAGE_USER_PATH);
      })
    ), {dispatch: false}
  );

  public readonly signUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUp),
      switchMap(payload => {
        console.log('inSwitch');
        return this.userService.api.usersCreate(payload)
            .pipe(map((res) => {
                  console.log('inMap');
                  return res.data.value
                    ? AuthActions.SignUpSuccess(res.data.value as User)
                    : AuthActions.SignUpFailure(res.data.error as IError)
                }
              )
            )
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
    ), {dispatch: false}
  );

  public readonly signUpFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUpFailure),
      tap((payload) => {
        console.error(payload);
      })
    ), {dispatch: false}
  );
}
