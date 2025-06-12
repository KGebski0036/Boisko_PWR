import { Component, OnInit } from '@angular/core';
import { GameService, Game } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  unverifiedGames: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadUnverifiedGames();
  }

  loadUnverifiedGames() {
    this.gameService.getGames().subscribe(games => {
      this.unverifiedGames = games.filter(game => !game.is_tournament_verified);
    });
  }

  verifyGame(gameId: number) {
    this.gameService.verifyGame(gameId).subscribe(() => {
      this.loadUnverifiedGames();
    });
  }
}
