import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExportService } from 'src/app/service/export/export.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-report-order',
  templateUrl: './report-order.component.html',
  styleUrls: ['./report-order.component.css']
})
export class ReportOrderComponent {
  start: any;
  end: any;
  orders: any;
  form!: FormGroup;

  constructor(
    private service: OrderService,
    private _export: ExportService
  ) {
  }

  initForm() {
    this.form = new FormGroup({
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required)
    });
  }

  getOrders = () => {
    this.service.getOrders().subscribe(
      (data: any) => {
        this.orders = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getOrdersByDate = () => {
    this.service.getReportOrdersByDate(this.form.value).subscribe(
      (data: any) => {
        this.start = this.formatDate(this.form.value.start_date);
        this.end = this.formatDate(this.form.value.end_date);
        this.orders = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  exportExcel() {
    this._export.handleExportOptions(this.orders, '.xlsx', `orders ${this.start} to ${this.end}`);
  }

  exportCsv() {
    this._export.handleExportOptions(this.orders, '.csv', `orders ${this.start} to ${this.end}`);
  }

  formatDateTime(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())} ${this.padZero(dateObject.getHours())}:${this.padZero(dateObject.getMinutes())}:${this.padZero(dateObject.getSeconds())}`;
    return formattedDate;
  }

  formatDate(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())}`;
    return formattedDate;
  }

  padZero(value: number): string {
    return String(value).padStart(2, '0');
  }

  ngOnInit() {
    this.initForm();
    this.getOrders();
  }
}
