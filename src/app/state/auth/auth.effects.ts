import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  EAuthActions,
  LoginFailure,
  LoginSuccess,
  SignUp,
  SignUpSuccess,
  Login,
  SignUpFailure,
  Logout,
  LogoutSuccess,
} from './auth.actions';
import { AuthService } from './auth.service';
import { APP_SOCCER_JWT_KEY } from '../../../app.constants';
import { SweetAlertsService } from '../../services/alerts/sweet-alerts.service';
import { AUTH_ALERTS } from '../../../assets/consts/configs/alerts-config.const';

@Injectable()
export class AuthEffects {
  redirectCb = () => {
    this.router.navigate(['/']);
  };

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sweetAlertsService: SweetAlertsService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Login>(EAuthActions.LOGIN),
      switchMap((action) =>
        this.authService.login(action.payload).pipe(
          map((response) => {
            localStorage.setItem(APP_SOCCER_JWT_KEY, response.token);
            this.sweetAlertsService.fireAlert(
              {
                ...AUTH_ALERTS['success'],
                title: `Welcome Back ${response.user.name}!`,
              },
              this.redirectCb
            );

            return new LoginSuccess(response);
          }),
          catchError((error: any) => {
            this.sweetAlertsService.fireAlert({
              ...AUTH_ALERTS['error'],
              title: `${error.error.message}`,
            });
            return of(
              new LoginFailure({
                code: error.status,
                status: error.type,
                message: error.error.message,
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
            this.sweetAlertsService.fireAlert(
              {
                ...AUTH_ALERTS['success'],
                title: `Welcome ${response.user.name}!`,
              },
              this.redirectCb
            );
            return new SignUpSuccess(response);
          }),
          catchError((error: any) => {
            this.sweetAlertsService.fireAlert({
              ...AUTH_ALERTS['error'],
              title: `${error.error.message}`,
            });
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Logout>(EAuthActions.LOGOUT),
      switchMap(() => {
        localStorage.removeItem(APP_SOCCER_JWT_KEY);
        this.sweetAlertsService.fireAlert(
          { ...AUTH_ALERTS['success'], title: 'Logged Out Successfully!' },
          this.redirectCb
        );
        return of(new LogoutSuccess());
      })
    )
  );
}
