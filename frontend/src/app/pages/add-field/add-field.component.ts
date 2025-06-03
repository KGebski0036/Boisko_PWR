import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddField, FieldService } from '../../services/field.service';
import { Activite, ActiviteService } from '../../services/activite.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-field',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-field.component.html',
  styleUrl: './add-field.component.css'
})
export class AddFieldComponent implements OnInit {
  fieldForm: any;
  submitted = false;
  success = false;
  activities: Activite[] = [];

  constructor(private fb: FormBuilder, private fieldService: FieldService, private activityService: ActiviteService) {}

  ngOnInit(): void {
    this.fieldForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      max_capacity: [0, [Validators.required, Validators.min(1)]],
      activityID: [0, Validators.required]
    });

    this.activityService.getActivites().subscribe({
      next: data => this.activities = data,
      error: err => console.error('Failed to load activities', err)
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.fieldForm.valid) {
      const fieldData: AddField = this.fieldForm.value;
      this.fieldService.addField(fieldData).subscribe({
        next: () => this.success = true,
        error: err => console.error('Error:', err)
      });
    }
  }
}
