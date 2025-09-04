import { Component } from "@angular/core";
import { HeaderComponent } from "./core/layout/page-partial/header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/layout/page-partial/footer/footer.component";
import { GeneralComponent } from "./core/layout/general/general.component";

@Component({
  selector: 'app-root', 
   imports: [HeaderComponent, RouterOutlet, FooterComponent, GeneralComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'MgSystemUI';
}