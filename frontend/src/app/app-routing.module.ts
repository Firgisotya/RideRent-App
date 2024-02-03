import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexUserComponent } from './pages/user/index-user/index-user.component';
import { IndexVehicleComponent } from './pages/vehicle/index-vehicle/index-vehicle.component';
import { CreateVehicleComponent } from './pages/vehicle/create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './pages/vehicle/edit-vehicle/edit-vehicle.component';
import { IndexOrderComponent } from './pages/order/index-order/index-order.component';
import { CreateOrderComponent } from './pages/order/create-order/create-order.component';
import { ReportOrderComponent } from './pages/report/report-order/report-order.component';
import { IndexApprovalComponent } from './pages/approval/index-approval/index-approval.component';
import { CreateApprovalComponent } from './pages/approval/create-approval/create-approval.component';
import { ApprovalByUserComponent } from './pages/approval/approval-by-user/approval-by-user.component';
import { ApprovalShowByOrderComponent } from './pages/approval/approval-show-by-order/approval-show-by-order.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'vehicles', children: [
    { path: '', component: IndexVehicleComponent },
    { path: 'create', component: CreateVehicleComponent },
    { path: 'edit/:id', component: EditVehicleComponent },
  ]},
  { path: 'orders', children: [
    { path: '', component: IndexOrderComponent },
    { path: 'create', component: CreateOrderComponent },
    { path: 'reports', component: ReportOrderComponent },
  ]},
  { path: 'users', component: IndexUserComponent },
  { path: 'approvals', children: [
    { path: '', component: IndexApprovalComponent },
    { path: 'create/:order_id', component: CreateApprovalComponent },
    { path: 'by/order/:order_id', component: ApprovalShowByOrderComponent },
    { path: 'by/user', component: ApprovalByUserComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]



})
export class AppRoutingModule { }
