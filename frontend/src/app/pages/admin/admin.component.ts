import { Component } from '@angular/core';
import { ActiviteListComponent } from "../../components/activite-list/activite-list.component";
import { FieldListComponent } from "../../components/field-list/field-list.component";

@Component({
  selector: 'app-admin',
  imports: [ActiviteListComponent, FieldListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
