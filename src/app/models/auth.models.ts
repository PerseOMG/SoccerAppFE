import { UserModel } from './user.models';
export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IAuthResponse {
  status: string;
  token: string;
  data: {
    user: UserModel;
  };
}
