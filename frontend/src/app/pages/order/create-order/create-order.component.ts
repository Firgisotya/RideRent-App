import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  form!: FormGroup;
  response: any;
  vehicles: any;
  approval_users: any;

  constructor(
    private service: OrderService,
    private router: Router
  ) {
  }

  initForm() {
    this.form = new FormGroup({
      vehicle_id: new FormControl('-1', Validators.required),
      employee_name: new FormControl('', Validators.required),
      driver_name: new FormControl('', Validators.required),
      information: new FormControl('', Validators.required)
    });
  }

  getVehicles = () => {
    this.service.getVehicles().subscribe(
      (data: any) => {
        this.vehicles = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  createOrder() {
    this.service.createOrder(this.form.value).subscribe({
      next: data => {
        this.handleCreateSuccess(data);
      },
      error: err => {
        this.handleCreateError(err);
      }
    });
  }

  handleCreateSuccess(data: any) {
    this.response = data.data;
    this.router.navigate(['/orders']);
    Swal.fire(
      'Success!',
      'Order has been created.',
      'success'
    )
  }

  handleCreateError(err: { error: { message: string; data: any; }; }) {
    if (err.error.message === 'Validation errors') {
      // Handle validation errors
      const validationErrors = err.error.data;
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          this.form.get(field)?.setErrors({ serverError: validationErrors[field][0] });
          Swal.fire(
            'Error!',
            validationErrors[field][0],
            'error'
          )
        }
      }
    } else {
      Swal.fire(
        'Error!',
        err.error.message,
        'error'
      )
    }
  }

  ngOnInit() {
    this.getVehicles();
    this.initForm();
  }
}
