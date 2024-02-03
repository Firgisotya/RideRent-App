import { Component } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-order',
  templateUrl: './index-order.component.html',
  styleUrls: ['./index-order.component.css']
})
export class IndexOrderComponent {
  response: any;

  constructor(
    private service: OrderService,
  ) { }

  formatDate(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())}`;
    return formattedDate;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getOrders = () => {
    this.service.getOrders().subscribe(
      (data: any) => {
        this.response = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteOrder = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it!',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteOrder(id).subscribe(
          (data: any) => {
            this.getOrders();
            Swal.fire(
              'Deleted!',
              'Your order has been deleted.',
              'success'
            )
          },
          error => {
            Swal.fire(
              'Failed!',
              'Your order failed to delete.',
              'error'
            )
          }
        )
      }
    })
  }

  returned(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will return this order.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, return it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.value) {
        this.service.updateReturnOrder(id).subscribe({
          next: data => {
            this.handleSuccess(data, 'Order has been returned.');
          },
          error: err => {
            this.handleError(err);
          }
        });
      }
    })
  }

  handleSuccess(data: any, message: string) {
    this.getOrders();
    Swal.fire(
      'Success!',
      message,
      'success'
    )
  }

  handleError(err: any) {
    this.getOrders();
    Swal.fire(
      'Error!',
      'Order has not been returned.',
      'error'
    )
  }

  ngOnInit() {
    this.getOrders();
  }
}
