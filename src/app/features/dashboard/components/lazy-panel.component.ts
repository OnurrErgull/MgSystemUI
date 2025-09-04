import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-lazy-panel',
  template: `
  <div class="card shadow-sm">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <div class="fw-bold">Lazy Panel</div>
        <div class="text-secondary small">Bu panel ayrı bundle olarak yüklenir.</div>
      </div>
      <button class="btn btn-sm btn-outline-primary">Aksiyon</button>
    </div>
  </div>`
})
export class LazyPanelComponent {}