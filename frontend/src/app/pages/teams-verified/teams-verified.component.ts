// frontend/src/app/pages/teams/teams.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamService, Team } from '../../services/team.service';
import { Activite, ActiviteService } from '../../services/activite.service';

@Component({
  selector: 'app-teams-verified',
  standalone: true,
  imports: [
    CommonModule,  // dla *ngFor i *ngIf
    NgForOf,
    NgIf,
    RouterModule  // dla routerLink
  ],
  templateUrl: './teams-verified.component.html',
  styleUrls: ['./teams-verified.component.css']
})
export class TeamsVerifiedComponent implements OnInit {
  teams: Team[] = [];
  activities: Activite[] = [];

  constructor(private teamService: TeamService, private activityService: ActiviteService) {}

  ngOnInit(): void {
    this.loadTeams();
    this.activityService.getActivites().subscribe(data => this.activities = data);
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe({
      next: data => this.teams = data,
      error: err => console.error('Error loading teams', err)
    });
  }

  // metoda wywoływana z szablonu <button (click)="verify(team.team_id)">
  verify(teamId: number): void {
    this.teamService.verifyTeam(teamId).subscribe({
      next: () => this.loadTeams(),
      error: err => console.error('Error verifying team', err)
    });
  }

  getActivityName(id: number): string {
    const activity = this.activities.find(a => a.id === id);
    return activity ? activity.name : 'Unknown';
  }
}
