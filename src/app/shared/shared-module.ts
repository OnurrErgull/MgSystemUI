import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast.component/toast.component'; // Doğru yolu kontrol edin
import { ModalComponent } from './components/modal.component/modal.component'; // Doğru yolu kontrol edin

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,   // <--- Standalone bileşenler BURADA (imports array'inde) olmalı
    ModalComponent    // <--- Standalone bileşenler BURADA (imports array'inde) olmalı
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,   // <--- imports'a eklendikten sonra BURADAN dışa aktarılabilir
    ModalComponent    // <--- imports'a eklendikten sonra BURADAN dışa aktarılabilir
  ],
  declarations: [
    // Standalone bileşenler (ToastComponent, ModalComponent) buraya ASLA gelmemeli.
    // Bu array şimdilik boş kalmalı.
  ]
})
export class SharedModule {}