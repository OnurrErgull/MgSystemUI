import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout/layout';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Layout, Sidebar],
  imports: [CommonModule, RouterModule,Header],
  exports: [Layout]
})
export class LayoutModule {}
