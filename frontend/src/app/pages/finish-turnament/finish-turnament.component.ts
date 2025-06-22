import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails, GameService } from '../../services/game.service';
import { of, switchMap } from 'rxjs';
import { Team, TeamService } from '../../services/team.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-finish-turnament',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './finish-turnament.component.html',
  styleUrl: './finish-turnament.component.css'
})
export class FinishTurnamentComponent implements OnInit {

  game: GameDetails | null = null;
  availableTeams: Team[] = [];
  placements: { [teamId: number]: number } = {};
  placeOptions: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private teamService: TeamService,
  ) {}

  ngOnInit(): void {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          return id ? this.gameService.getGameDetails(+id) : of(null);
        })
      ).subscribe(gameDetails => {
        this.game = gameDetails;
        // Jeśli gra jest turniejem, ładujemy dostępne drużyny
        if (this.game && this.game.booking_type === 'TURNAMENT') {
          this.loadAvailableTeams();
        }
      });

    }
    
    loadAvailableTeams(): void {
      
      this.teamService.getTeams().subscribe(teams => {
        this.availableTeams = teams.filter(t => t.is_verified);
      });

      if (this.game?.teams_in_game) {
        const total = this.game.teams_in_game.length;
        this.placeOptions = Array.from({ length: total }, (_, i) => i + 1);
      }
    }

  finishTournament(): void {
  if (!this.game) return;

  const data = Object.entries(this.placements).map(([teamId, placed]) => ({
    tournament_id: this.game!.game_id,
    team_id: +teamId,
    placed: placed,
  }));

  this.gameService.finishTournament(this.game.game_id, data).subscribe({
    next: () => alert("Tournament finished and points assigned!"),
    error: err => console.error("Error finishing tournament", err)
  });
}
}
