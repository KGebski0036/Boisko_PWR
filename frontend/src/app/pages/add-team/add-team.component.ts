// frontend/src/app/pages/add-team/add-team.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TeamService, AddTeam } from '../../services/team.service';
import { ActiviteService, Activite } from '../../services/activite.service';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  teamForm!: FormGroup;
  activities: Activite[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private activityService: ActiviteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      team_name: ['', Validators.required],
      activityID: [null, Validators.required],
      amount_players: [1, [Validators.required, Validators.min(1)]],
      amount_points: [0, [Validators.required, Validators.min(0)]]
    });

    this.activityService.getActivites().subscribe({
      next: data => {
        console.log('Loaded activities:', data);
        this.activities = data;
      },
      error: err => console.error('Error loading activities', err)
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.teamForm.valid) {
      const teamData: AddTeam = this.teamForm.value;
      this.teamService.addTeam(teamData).subscribe({
        next: () => this.router.navigate(['/teams']),
        error: err => console.error('Error adding team', err)
      });
    }
  }
}
