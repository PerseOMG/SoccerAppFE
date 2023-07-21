import { UserModel } from '../../models/user.models';
import { EAuthActions, authActions } from './auth.actions';
import { IAppError } from '../../interfaces/appError.interface';

export interface IAuthState {
  name: string;
  email: string;
  photo: string;
  role: string;
  error: IAppError;
  status: 'error' | 'pending' | 'success';
}

export const initAuthState: IAuthState = {
  name: '',
  email: '',
  photo: '',
  role: '',
  error: undefined,
  status: null,
};

export function authReducer(
  state: IAuthState = initAuthState,
  action: authActions
): IAuthState {
  switch (action.type) {
    case EAuthActions.LOGIN_SUCCESS || EAuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        photo: action.payload.user.photo,
        role: action.payload.user.role,
        status: 'success',
        error: undefined,
      };
    case EAuthActions.LOGIN_FAILURE || EAuthActions.SIGNUP_FAILURE:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };

    default:
      return state;
  }
}
