import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent {
  form!: FormGroup;
  response: any;

  constructor(
    private service: UserService
  ) { }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.initForm();
    this.getUsers();
  }

  getUsers = () => {
    this.service.getUsers().subscribe({
      next: (result: any) => {
        
        this.response = result.data;
      },
      error: (error: any) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  createUser = () => {
    Swal.fire({
      title: 'Create User',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Email">',
      focusConfirm: false,
      preConfirm: () => {
        const name = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        const email = (<HTMLInputElement>document.getElementById('swal-input2')).value;

        this.service.createUser({ name, email }).subscribe({
          next: data => {
            this.handleSuccess(data, 'User has been created.');
          },
          error: err => {
            this.handleError(err);
          }
        });
      }
    })
  }

  updateUser = (id: number) => {
    this.service.getUserById(id).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Update User',
          html:
            `<input id="swal-input1" class="swal2-input" value="${data.data.name}">` +
            `<input id="swal-input2" class="swal2-input" value="${data.data.email}">`,
          focusConfirm: false,
          preConfirm: () => {
            const name = (<HTMLInputElement>document.getElementById('swal-input1')).value;
            const email = (<HTMLInputElement>document.getElementById('swal-input2')).value;

            this.service.updateUser(id, { name, email }).subscribe({
              next: data => {
                this.handleSuccess(data, 'User has been updated.');
              },
              error: err => {
                this.handleError(err);
              }
            });
          }
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  handleSuccess(data: any, message: any): void {
    this.getUsers();
    Swal.fire(
      'Success!',
      message,
      'success'
    )
  }

  handleError(err: { error: { message: string; data: any; }; }): void {
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
      Swal.fire(
        'Warning!',
        `${err.error.message}`,
        'warning'
      );
    }
  }

  formatDateTime(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())} ${this.padZero(dateObject.getHours())}:${this.padZero(dateObject.getMinutes())}:${this.padZero(dateObject.getSeconds())}`;
    return formattedDate;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
