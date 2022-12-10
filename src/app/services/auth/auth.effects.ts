import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EAuthActions,
  LoginFailure,
  LoginSuccess,
  SignUp,
  SignUpSuccess,
  Login,
  SignUpFailure,
} from './auth.actions';
import { AuthService } from './auth.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { APP_SOCCER_JWT_KEY } from '../../../app.constants';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Login>(EAuthActions.LOGIN),
      switchMap((action) =>
        this.authService.login(action.payload).pipe(
          map((response) => {
            localStorage.setItem(APP_SOCCER_JWT_KEY, response.token);
            this.router.navigate(['teams']);
            return new LoginSuccess(response);
          }),
          catchError((error: any) => {
            console.log(error);
            return of(
              new LoginFailure({
                code: error.status,
                status: error.type,
                message: error.message,
              })
            );
          })
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SignUp>(EAuthActions.SIGNUP),
      switchMap((action) =>
        this.authService.signup(action.payload).pipe(
          map((response) => {
            localStorage.setItem(APP_SOCCER_JWT_KEY, response.token);
            this.router.navigate(['teams']);
            return new SignUpSuccess(response);
          }),
          catchError((error: any) => {
            console.log(error);
            return of(
              new SignUpFailure({
                code: error.status,
                status: error.type,
                message: error.message,
              })
            );
          })
        )
      )
    )
  );
}
