import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import 'datatables.net-bs5';
import { environment } from '../../../environments/environment';

declare const $: any;

type DTCallback = (result: any) => void;

@Component({
  standalone: true,
  selector: 'app-data-table',
  template: `
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="fw-bold">{{ title }}</div>
      </div>
      <table class="table table-striped" width="100%"></table>
    </div>
  </div>`
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Input() columns: any[] = [];
  @Input() ajaxUrl?: string;
  private table?: any;

  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    const tableEl = this.host.nativeElement.querySelector('table');
    this.table = $(tableEl).DataTable({
      processing: true,
      serverSide: false,
      ajax: (_data: any, cb: DTCallback) => {
        fetch(`${environment.apiUrl}${this.ajaxUrl}`)
          .then(r => r.json())
          .then(json => cb({ data: json.products || json || [] }));
      },
      columns: this.columns,
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      order: [],
    });
  }

  ngOnDestroy(): void { this.table?.destroy(true); }
}