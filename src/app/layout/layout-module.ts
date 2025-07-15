import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Layout } from './layout/layout';
import { AppRoutingModule } from "../app-routing-module";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    Header,
    Sidebar,
    Layout,
    AppRoutingModule,
    RouterModule
]
})
export class LayoutModule { }
