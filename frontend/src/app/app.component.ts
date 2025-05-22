import { Component } from '@angular/core';
import { ActiviteListComponent } from "./components/activite-list/activite-list.component";

@Component({
  selector: 'app-root',
  imports: [ActiviteListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
