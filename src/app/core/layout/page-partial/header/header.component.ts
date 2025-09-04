import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePartialService } from '../page-partial.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private s = inject(PagePartialService);
  // mobile overlay için bir işaret; AppLayout'ta body class'ına da uygulanabilir
  mobileOpen = signal(false);

  toggleSidebar() {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      this.mobileOpen.update(v => !v);
      this.s.setMobileOpen(this.mobileOpen());
    } else {
      this.s.toggle();
    }
  }
}
