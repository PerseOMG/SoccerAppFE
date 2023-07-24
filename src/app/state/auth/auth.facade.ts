import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import * as authActions from './auth.actions';
import { ILogin, ISignUp } from '../../models/auth.models';
import { authSelectors } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // Actions
  login = (body: ILogin) => this.store.dispatch(new authActions.Login(body));
  signup = (body: ISignUp) => this.store.dispatch(new authActions.SignUp(body));
  logout = () => this.store.dispatch(new authActions.Logout());

  // Selectors
  selectUserData = () => this.store.select(authSelectors.selectUser);

  constructor(private store: Store<AppState>) {}
}
