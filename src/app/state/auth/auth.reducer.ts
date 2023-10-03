import { EAuthActions, authActions } from './auth.actions';
import { IAppError } from '../../models/appError.models';
import Swal from 'sweetalert2';

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

const loginSignupSuccessCb = (state, action) => {
  Swal.close();
  return {
    ...state,
    name: action.payload.user.name,
    email: action.payload.user.email,
    photo: action.payload.user.photo,
    role: action.payload.user.role,
    status: 'success',
    error: undefined,
  };
};

const loginSignupFailureCb = (state, action) => {
  return {
    ...state,
    status: 'error',
    error: action.payload,
  };
};

export function authReducer(
  state: IAuthState = initAuthState,
  action: authActions
): IAuthState {
  switch (action.type) {
    case EAuthActions.LOGIN_SUCCESS:
      return loginSignupSuccessCb(state, action);

    case EAuthActions.SIGNUP_SUCCESS:
      return loginSignupSuccessCb(state, action);

    case EAuthActions.LOGIN_FAILURE:
      return loginSignupFailureCb(state, action);

    case EAuthActions.SIGNUP_FAILURE:
      return loginSignupFailureCb(state, action);

    default:
      return state;
  }
}
