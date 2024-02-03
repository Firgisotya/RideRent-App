import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/service/vehicle/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent {
  form!: FormGroup;
  response: any;
  id: any;

  constructor(
    private service: VehicleService,
    private router: Router
  ) { }

  initForm() {
    this.form = new FormGroup({
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      police_number: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
    });
  }

  showData = () => {
    this.id = this.router.url.split('/')[3];
    this.service.getVehicleById(this.id).subscribe(
      (data: any) => {
        this.form.patchValue({
          category: data.data.category,
          type: data.data.type,
          name: data.data.name,
          police_number: data.data.police_number,
          color: data.data.color,
          year: data.data.year,
          stock: data.data.stock,
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  updateVehicle(id: number) {
    this.service.updateVehicle(id, this.form.value).subscribe({
      next: data => {
        this.handleUpdateSuccess(data);
      },
      error: err => {
        this.handleUpdateError(err);
      }
    });
  }

  handleUpdateSuccess(data: any) {
    this.response = data.data;
    this.router.navigate(['/vehicles']);
    Swal.fire(
      'Success!',
      'Vehicle has been updated.',
      'success'
    )
  }

  handleUpdateError(err: { error: { message: string; data: any; }; }) {
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
    this.showData();
    this.initForm();
  }
}
