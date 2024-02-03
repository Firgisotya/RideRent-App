import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { httpHeadersLoggedIn } from 'src/app/helper/header.helper';
import { httpHelper } from 'src/app/helper/http.helper';
import { baseUrl } from 'src/app/service/base_url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _baseUrl(){
    return new baseUrl()._apiUrl();
  }

  private _url: string = this._baseUrl();

  constructor(private http: HttpClient) {}

  getUsers = () => {
    return this.http.get(this._url + "/users", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getUserById = (id: number) => {
    return this.http.get(this._url + "/users/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  createUser = (body: any) => {
    return this.http.post(this._url + "/users", body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  updateUser = (id: number, body: any) => {
    return this.http.put(this._url + "/users/" + id, body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  deleteUser = (id: number) => {
    return this.http.delete(this._url + "/users/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }
}
