import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as authActions from './auth.actions';
// import { teamsSelectors } from './teams.selectors';
import { ILogin, ISignUp } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // Selectors
  // selectAllTeams = () => this.store.select(teamsSelectors.allTeams);

  // Actions
  login = (body: ILogin) => this.store.dispatch(new authActions.Login(body));
  signup = (body: ISignUp) => this.store.dispatch(new authActions.SignUp(body));

  constructor(private store: Store<AppState>) {}
}
