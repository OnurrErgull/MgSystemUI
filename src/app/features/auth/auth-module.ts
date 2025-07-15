import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, Login]
})
export class AuthModule {}
