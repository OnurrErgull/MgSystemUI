import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { MainService } from '../../../services/common/general/main.service';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SidebarToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData: INavbarData[] = [];
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router,
    private mainService: MainService) {}

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.fetchNavData();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  getActiveUpDown(data: INavbarData): string {
    var rtrn="";
    if (!this.multiple) {
      for(const item of this.navData) {
        if (data === item && item.expanded) {
          rtrn = 'downIcon';
    console.log(item.label+rtrn);

          break;
        } else if(data === item && !item.expanded) {
          rtrn = 'upIcon';
    console.log(item.label+rtrn);
    break;
        }
      }
    }
    return rtrn;
  }

  fetchNavData(): void {
    this.mainService.getSidebar().subscribe({
      next: (data) => {
        this.navData = data;
      },
      error: (error) => {
        console.error('Sidebar verisi yüklenirken bir hata oluştu', error);
      }
    });
  }
}