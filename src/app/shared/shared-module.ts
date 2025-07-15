import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast.component/toast.component'; // Path doğru varsayılmıştır
import { ModalComponent } from './components/modal.component/modal.component'; // Path doğru varsayılmıştır

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,   // <--- Standalone bileşenler BURADA import edilir (DECLARATIONS'ta değil)
    ModalComponent    // <--- Standalone bileşenler BURADA import edilir (DECLARATIONS'ta değil)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastComponent,   // <--- Import edildikten sonra buradan dışa aktarılabilir
    ModalComponent,   // <--- Import edildikten sonra buradan dışa aktarılabilir
    ReactiveFormsModule
  ],
  declarations: [
    // Burası şimdi boş kalacak, ToastComponent ve ModalComponent standalone olduğu için burada olmamalı.
    // Eğer ileride standalone olmayan başka bileşenleriniz olursa buraya eklersiniz.
  ]
})
export class SharedModule {}