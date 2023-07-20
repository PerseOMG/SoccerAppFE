import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './../../models/auth.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.models';
import { IAuthResponse, ISignUp } from '../../models/auth.models';
import { APP_SOCCER_SERVER_URL } from 'src/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(body: ILogin): Observable<UserModel> {
    return this.http
      .post<IAuthResponse>(`${APP_SOCCER_SERVER_URL}/users/login`, body)
      .pipe(map((data: IAuthResponse) => data.data));
  }

  signup(body: ISignUp): Observable<UserModel> {
    return this.http
      .post<IAuthResponse>(`${APP_SOCCER_SERVER_URL}/users/signup`, body)
      .pipe(map((data: IAuthResponse) => data.data));
  }
}
