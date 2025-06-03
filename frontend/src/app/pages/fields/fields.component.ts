import { Component } from '@angular/core';
import { VerifiedFieldsComponent } from "../../components/verified-fields/verified-fields.component";

@Component({
  selector: 'app-fields',
  imports: [VerifiedFieldsComponent],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css'
})
export class FieldsComponent {

}
