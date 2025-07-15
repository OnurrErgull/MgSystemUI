import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';


@NgModule({
  declarations: [
    Dashboard,
    DashboardPage
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
