import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { httpHeadersLoggedIn } from 'src/app/helper/header.helper';
import { httpHelper } from 'src/app/helper/http.helper';
import { baseUrl } from 'src/app/service/base_url';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  _baseUrl(){
    return new baseUrl()._apiUrl();
  }

  private _url: string = this._baseUrl();

  constructor(private http: HttpClient) {}

  getVehicles = () => {
    return this.http.get(this._url + "/vehicles", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getVehicleById = (id: number) => {
    return this.http.get(this._url + "/vehicles/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  createVehicle = (body: any) => {
    return this.http.post(this._url + "/vehicles", body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  updateVehicle = (id: number, body: any) => {
    return this.http.put(this._url + "/vehicles/" + id, body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  deleteVehicle = (id: number) => {
    return this.http.delete(this._url + "/vehicles/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }
}
