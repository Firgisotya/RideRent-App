import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ApprovalService } from 'src/app/service/approval/approval.service';

@Component({
  selector: 'app-approval-show-by-order',
  templateUrl: './approval-show-by-order.component.html',
  styleUrls: ['./approval-show-by-order.component.css']
})
export class ApprovalShowByOrderComponent {
  approvals: any;
  id: any;

  constructor(
    private service: ApprovalService,
    private route: ActivatedRoute
  ) {
  }

  formatDateTime(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())} ${this.padZero(dateObject.getHours())}:${this.padZero(dateObject.getMinutes())}:${this.padZero(dateObject.getSeconds())}`;
    return formattedDate;
  }

  padZero(value: number): string {
    return String(value).padStart(2, '0');
  }

  getApprovals = () => {
    this.id = this.route.snapshot.paramMap.get('order_id');
    this.service.getApprovalByOrderId(this.id).subscribe(
      (data: any) => {
        console.log(data, this.id);

        this.approvals = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
    this.getApprovals();
  }
}
