import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [RouterModule], // routerLink / routerLinkActive için şart
  styleUrls: ['./sidebar.component.css'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({ height: '0', overflow: 'hidden' })),
      state('visible', style({ height: '*' })),
      transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
      transition('void => *', animate(0)),
    ]),
  ],
  template: `
    @if (collapsed && data.items?.length) {
      <ul
        class="app-sublevel-ul sublevel-nav"
        [@submenu]="expanded
          ? { value: 'visible', params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*' } }
          : { value: 'hidden', params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0' } }"
      >
        @for (item of data.items; track item.routeLink ?? item.label ?? $index) {
          <li class="sublevel-nav-item">
            @if (item.items?.length) {
              <a
                class="sublevel-nav-link"
                (click)="handleClick(item)"
                [class.active-sublevel]="isActive(item)"
              >
                <!-- <svg class="sublevel-link-icon fa fa-circle"></svg> -->
                @if (collapsed) {
                  <span class="sublevel-link-text" @fadeInOut>{{ item.label }}</span>
                }
                @if (collapsed) {
                  <svg
                    class="menu-collapse-icon fa-solid"
                    [class.fa-angle-down]="!item.expanded"
                    [class.fa-angle-up]="item.expanded"
                  ></svg>
                }
              </a>

              <div>
                <app-sublevel-menu
                  [data]="item"
                  [collapsed]="collapsed"
                  [multiple]="multiple"
                  [expanded]="item.expanded"
                ></app-sublevel-menu>
              </div>
            } @else {
              <a
                class="sublevel-nav-link"
                [routerLink]="[item.routeLink]"
                routerLinkActive="active-sublevel"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <!-- <svg class="sublevel-link-icon fa fa-circle"></svg> -->
                @if (collapsed) {
                  <span class="sublevel-link-text" @fadeInOut>{{ item.label }}</span>
                }
              </a>
            }
          </li>
        }
      </ul>
    }
  `,
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: INavbarData = { routeLink: '', icon: '', label: '', items: [] };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple = false;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  handleClick(item: any): void {
    if (!this.multiple && this.data.items?.length) {
      for (const modelItem of this.data.items) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  isActive(item: INavbarData): boolean {
    return !!(item.expanded && item.routeLink && this.router.url.includes(item.routeLink));
  }
}
