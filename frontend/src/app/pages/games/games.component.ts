import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { TeamService, Team } from '../../services/team.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-games',
  standalone: true,
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  teams: Team[] = [];
  teamIdToJoin = new FormControl(0);  // <== wybór zespołu

  constructor(
    private gameService: GameService,
    private teamService: TeamService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGames();
    //this.loadTeams();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data.filter(g => g.is_tournament_verified === true);
    });
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
      if (this.teams.length > 0) {
        this.teamIdToJoin.setValue(this.teams[0].team_id);
      }
    });
  }

  goToAddGame(): void {
    this.router.navigate(['/addgame']);
  }

  join(gameId: number): void {
    const teamId = this.teamIdToJoin.value;
    if (teamId) {
      this.gameService.joinGame(gameId, teamId).subscribe({
        next: () => alert(`Dołączono do gry ${gameId} jako zespół ${teamId}`),
        error: err => console.error('Błąd przy dołączaniu', err)
      });
    }
  }
}
