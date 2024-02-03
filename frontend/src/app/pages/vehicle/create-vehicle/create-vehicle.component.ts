import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/service/vehicle/vehicle.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent {
  form!: FormGroup;
  response: any;

  constructor(
    private service: VehicleService,
    private router: Router
  ) { }

  initForm() {
    this.form = new FormGroup({
      category: new FormControl('-1', Validators.required),
      type: new FormControl('-1', Validators.required),
      name: new FormControl('', Validators.required),
      police_number: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
    });
  }

  createVehicle() {
    this.service.createVehicle(this.form.value).subscribe({
      next: data => {
        this.handleCreateSuccess(data);
      },
      error: err => {
        this.handleCreateError(err);
      }
    });
  }

  handleCreateSuccess(data: any): void {
    this.response = data.data;
    this.router.navigate(['/vehicles']);
    Swal.fire(
      'Success!',
      'Vehicle has been created.',
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
            'Warning!',
            `${validationErrors[field][0]}`,
            'warning'
          );
        }
      }
    } else {
      // Handle other errors
      Swal.fire(
        'Warning!',
        `${err.error.message}`,
        'warning'
      );
    }
  }

  ngOnInit() {
    this.initForm();
  }
}
