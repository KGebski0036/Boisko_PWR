import { Component } from '@angular/core';
import { Field, FieldService } from '../../services/field.service';
import { Activite, ActiviteService } from '../../services/activite.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verified-fields',
  imports: [CommonModule],
  templateUrl: './verified-fields.component.html',
  styleUrl: './verified-fields.component.css'
})
export class VerifiedFieldsComponent {
  fields: Field[] = [];
  activities: Activite[] = [];

  constructor(private fieldService: FieldService,
       private activityService: ActiviteService,
       private router: Router) {}

  ngOnInit(): void {
    this.fieldService.getFields().subscribe({
      next: fields => {
        this.fields = fields.filter(f => f.is_verified === true);
      },
      error: err => console.error('Failed to fetch fields', err)
    });
    this.activityService.getActivites().subscribe(data => this.activities = data);
  }

  addField(){
    this.router.navigate(['/addfield']);
  }

  getActivityName(id: number): string {
    const activity = this.activities.find(a => a.id === id);
    return activity ? activity.name : 'Unknown';
  }
}
