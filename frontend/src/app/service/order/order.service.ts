import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { httpHeadersLoggedIn } from 'src/app/helper/header.helper';
import { httpHelper } from 'src/app/helper/http.helper';
import { baseUrl } from 'src/app/service/base_url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl(){
    return new baseUrl()._apiUrl();
  }

  private _url: string = this._baseUrl();

  constructor(private http: HttpClient) {}

  getReportApprovedOrders = () => {
    return this.http.get(this._url + "/orders/reports/approved-orders", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getReportOrdersByDate = (body: any) => {
    return this.http.post(this._url + "/orders/reports/orders-by-range-date", body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getReportVehicleOrders = () => {
    return this.http.get(this._url + "/orders/reports/vehicle-orders", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  updateReturnOrder = (id: string) => {
    return this.http.get(this._url + `/orders/${id}/returned`, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getOrders = () => {
    return this.http.get(this._url + "/orders", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getOrderById = (id: string) => {
    return this.http.get(this._url + "/orders/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  createOrder = (body: any) => {
    return this.http.post(this._url + "/orders", body, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  deleteOrder = (id: string) => {
    return this.http.delete(this._url + "/orders/" + id, httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }

  getVehicles = () => {
    return this.http.get(this._url + "/vehicles", httpHeadersLoggedIn).pipe(
      catchError(new httpHelper().errorHttpHelper)
    )
  }
}
