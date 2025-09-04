import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import tippy from 'tippy.js';
import { ToastrService } from 'ngx-toastr';
import { DataTableComponent } from '@src/app/shared/widgets/data-table.component';
import { LoadingDirective } from '@src/app/shared/directives/loading.directive';
import { LazyPanelComponent } from '../../components/lazy-panel.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, DataTableComponent, LoadingDirective, LazyPanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  private toastr = inject(ToastrService);
  ngOnInit(): void { tippy('[data-tippy-content]'); }
  notify() { this.toastr.success('İşlem başarılı', 'Başarılı'); }
}