import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService, GameDetails } from '../../services/game.service';
import { Team, TeamService } from '../../services/team.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: GameDetails | null = null;
  availableTeams: Team[] = [];
  teamToJoin = new FormControl<number | null>(null);
  isModerator = true;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private teamService: TeamService,
    private router: Router
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
      if (this.availableTeams.length > 0) {
        this.teamToJoin.setValue(this.availableTeams[0].team_id);
      }
    });
  }

  joinTournament(): void {
    const selectedTeamId = this.teamToJoin.value;
    if (!this.game || selectedTeamId === null) {
      alert("Proszę wybrać drużynę, którą chcesz dołączyć!");
      return;
    }

    this.gameService.joinGame(this.game.game_id, selectedTeamId).subscribe({
      next: () => {
        alert("Dołączono pomyślnie do turnieju!");
        // Ponownie ładujemy szczegóły gry, aby odświeżyć listę uczestników
        this.ngOnInit();
      },
      error: (err) => {
        alert(`Błąd: ${err.error.detail || 'Nie udało się dołączyć.'}`);
      }
    });
  }

  endTournament(): void {
    this.router.navigate(['/games/finish/' + this.game?.game_id]);
  }
}
