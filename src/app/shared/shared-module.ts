import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast.component/toast.component'; // Doğru yolu kontrol edin
import { ModalComponent } from './components/modal.component/modal.component';
import { Login } from '../features/auth/login/login'; // Doğru yolu kontrol edin

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,   // <--- Standalone bileşenler BURADA (imports array'inde) olmalı
    ModalComponent,    // <--- Standalone bileşenler BURADA (imports array'inde) olmalı
    Login
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,   // <--- imports'a eklendikten sonra BURADAN dışa aktarılabilir
    ModalComponent    // <--- imports'a eklendikten sonra BURADAN dışa aktarılabilir
  ],
  declarations: [
  ]
})
export class SharedModule {}