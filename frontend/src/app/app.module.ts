import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexUserComponent } from './pages/user/index-user/index-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexVehicleComponent } from './pages/vehicle/index-vehicle/index-vehicle.component';
import { CreateVehicleComponent } from './pages/vehicle/create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './pages/vehicle/edit-vehicle/edit-vehicle.component';
import { IndexOrderComponent } from './pages/order/index-order/index-order.component';
import { CreateOrderComponent } from './pages/order/create-order/create-order.component';
import { ApprovalByUserComponent } from './pages/approval/approval-by-user/approval-by-user.component';
import { IndexApprovalComponent } from './pages/approval/index-approval/index-approval.component';
import { CreateApprovalComponent } from './pages/approval/create-approval/create-approval.component';
import { ReportOrderComponent } from './pages/report/report-order/report-order.component';
import { ApprovalShowByOrderComponent } from './pages/approval/approval-show-by-order/approval-show-by-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AuthComponent,
    DashboardComponent,
    IndexUserComponent,
    IndexVehicleComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    IndexOrderComponent,
    CreateOrderComponent,
    ApprovalByUserComponent,
    IndexApprovalComponent,
    CreateApprovalComponent,
    ReportOrderComponent,
    ApprovalShowByOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
