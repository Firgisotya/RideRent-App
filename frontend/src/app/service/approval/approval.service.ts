import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { httpHeadersLoggedIn } from 'src/app/helper/header.helper';
import { httpHelper } from 'src/app/helper/http.helper';
import { baseUrl } from 'src/app/service/base_url';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  _baseUrl(){
    return new baseUrl()._apiUrl();
  }

  private _url: string = this._baseUrl();

  constructor(private http: HttpClient) {}

  getApprovals = () => {
    return this.http.get(this._url + "/approvals", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getApprovalByUserId = () => {
    return this.http.get(this._url + "/approvals/by/user", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getApprovalByOrderId = (id: string) => {
    return this.http.get(this._url + "/approvals/order/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getApprovalById = (id: number) => {
    return this.http.get(this._url + "/approvals/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  approve = (id: number) => {
    return this.http.get(this._url + `/approvals/${id}/approve`, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  // reject
  reject = (id: number) => {
    return this.http.get(this._url + `/approvals/${id}/reject`, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  createApproval = (body: any) => {
    return this.http.post(this._url + "/approvals", body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  updateApproval = (id: number, body: any) => {
    return this.http.put(this._url + "/approvals/" + id, body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  deleteApproval = (id: number) => {
    return this.http.delete(this._url + "/approvals/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getUsers = () => {
    return this.http.get(this._url + "/users", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }
}
