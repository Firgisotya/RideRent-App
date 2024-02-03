import { Component } from '@angular/core';
import { ApprovalService } from 'src/app/service/approval/approval.service';

@Component({
  selector: 'app-index-approval',
  templateUrl: './index-approval.component.html',
  styleUrls: ['./index-approval.component.css']
})
export class IndexApprovalComponent {
  approvals: any;

  constructor(
    private service: ApprovalService
  ) {
    this.getApprovals();
  }

  getApprovals = () => {
    this.service.getApprovals().subscribe(
      (data: any) => {
        this.approvals = data.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  formatDateTime(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}-${this.padZero(dateObject.getMonth() + 1)}-${this.padZero(dateObject.getDate())} ${this.padZero(dateObject.getHours())}:${this.padZero(dateObject.getMinutes())}:${this.padZero(dateObject.getSeconds())}`;
    return formattedDate;
  }

  padZero(value: number): string {
    return String(value).padStart(2, '0');
  }
}
