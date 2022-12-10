export interface UserModel {
  user: {
    name: string;
    email: string;
    photo?: string;
    role: string;
    _id?: string;
  };
  token: string;
}
