import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldService, Field } from '../../services/field.service';
import { Router } from '@angular/router';
import { Activite, ActiviteService } from '../../services/activite.service';

@Component({
  selector: 'app-field-list',
  imports: [CommonModule],
  templateUrl: './field-list.component.html',
  styleUrl: './field-list.component.css'
})
export class FieldListComponent {
    activities: Activite[] = [];
    fields: Field[] = [];
  
    constructor(private fieldService: FieldService,
       private activityService: ActiviteService,
       private router: Router) {}
  
    ngOnInit(): void {
      this.loadFields();
    }
  
    loadFields() {
      this.fieldService.getFields().subscribe(data => this.fields = data);
      this.activityService.getActivites().subscribe(data => this.activities = data);
    }
  
    addField() {
      this.router.navigate(['/addfield']);
    }

    getActivityName(id: number): string {
      const activity = this.activities.find(a => a.id === id);
      return activity ? activity.name : 'Unknown';
    }

    verify(id: number): void {
      this.fieldService.verifyField(id).subscribe({
        next: updated => {
          const field = this.fields.find(f => f.id === id);
          if (field) field.is_verified = updated.is_verified;
        },
        error: err => console.error('Failed to verify field', err)
      });
    }
}
