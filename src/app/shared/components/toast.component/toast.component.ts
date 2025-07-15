import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast align-items-center text-bg-success border-0 show" role="alert">
      <div class="d-flex">
        <div class="toast-body">{{ message }}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" (click)="visible = false"></button>
      </div>
    </div>
  `
})
export class ToastComponent {
  @Input() message: string = '';
  visible = true;
}
