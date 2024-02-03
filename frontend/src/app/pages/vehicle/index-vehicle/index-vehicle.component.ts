import { Component } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-vehicle',
  templateUrl: './index-vehicle.component.html',
  styleUrls: ['./index-vehicle.component.css']
})
export class IndexVehicleComponent {
  response: any;

  constructor(
    private service: VehicleService,
  ) { }

  formatDate(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())}`;
    return formattedDate;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getVehicles = () => {
    this.service.getVehicles().subscribe(
      (data: any) => {
        this.response = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteVehicle = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this vehicle!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it!',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteVehicle(id).subscribe(
          (data: any) => {
            this.response = data.data;
            this.getVehicles();
            Swal.fire(
              'Deleted!',
              'Your vehicle has been deleted.',
              'success'
            )
          },
          error => {
            Swal.fire(
              'Error!',
              'Your vehicle has not been deleted. Cause vehicle is in use.',
              'error'
            )
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your vehicle is safe :)',
          'error'
        )
      }
    })
  }

  ngOnInit(): void {
    this.getVehicles();
  }
}
