// frontend/src/app/pages/teams/teams.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamService, Team } from '../../services/team.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,  // dla *ngFor i *ngIf
    NgForOf,
    NgIf,
    RouterModule  // dla routerLink
  ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
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
}
