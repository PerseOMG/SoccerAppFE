import { Action } from '@ngrx/store';
import { IAppError } from '../../models/appError.models';
import { ILogin, ISignUp } from '../../models/auth.models';
import { UserModel } from '../../models/user.models';

export enum EAuthActions {
  LOGIN = '[APP Soccer] LOGIN',
  LOGIN_SUCCESS = '[APP Soccer] LOGIN_SUCCESS',
  LOGIN_FAILURE = '[APP Soccer] LOGIN_FAILURE',
  SIGNUP = '[APP Soccer] SIGNUP',
  SIGNUP_SUCCESS = '[APP Soccer] SIGNUP_SUCCESS',
  SIGNUP_FAILURE = '[APP Soccer] SIGNUP_FAILURE',
  LOGOUT = '[APP Soccer] LOGOUT',
  LOGOUT_SUCCESS = '[APP Soccer] LOGOUT_SUCCESS',
}

export class Login implements Action {
  public readonly type = EAuthActions.LOGIN;
  constructor(public payload: ILogin) {}
}

export class LoginSuccess implements Action {
  public readonly type = EAuthActions.LOGIN_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class LoginFailure implements Action {
  public readonly type = EAuthActions.LOGIN_FAILURE;
  constructor(public payload: IAppError) {}
}

export class SignUp implements Action {
  public readonly type = EAuthActions.SIGNUP;
  constructor(public payload: ISignUp) {}
}

export class SignUpSuccess implements Action {
  public readonly type = EAuthActions.SIGNUP_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class SignUpFailure implements Action {
  public readonly type = EAuthActions.SIGNUP_FAILURE;
  constructor(public payload: IAppError) {}
}

export class Logout implements Action {
  public readonly type = EAuthActions.LOGOUT;
}

export class LogoutSuccess implements Action {
  public readonly type = EAuthActions.LOGOUT_SUCCESS;
}

export type authActions =
  | Login
  | LoginFailure
  | LoginSuccess
  | SignUp
  | SignUpFailure
  | SignUpSuccess
  | Logout
  | LogoutSuccess;
