import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../page-partial/header/header.component";
import { FooterComponent } from "../page-partial/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../page-partial/sidebar/sidebar.component";
import { PagePartialService } from '../page-partial/page-partial.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-general',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, SidebarComponent, AsyncPipe],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  sidenav:any = inject(PagePartialService);
}
