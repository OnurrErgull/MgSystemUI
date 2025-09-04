import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
})

export class FooterComponent {
  today: number = Date.now();
}
