import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './../../models/auth.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.models';
import { IAuthResponse, ISignUp } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8000/api/v1';
  login(body: ILogin): Observable<UserModel> {
    return this.http
      .post<IAuthResponse>(`${this.url}/users/login`, body)
      .pipe(map((data: IAuthResponse) => data.data.user));
  }

  signup(body: ISignUp): Observable<UserModel> {
    return this.http
      .post<IAuthResponse>(`${this.url}/users/signup`, body)
      .pipe(map((data: IAuthResponse) => data.data.user));
  }
}
