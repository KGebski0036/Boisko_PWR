import { Component, OnInit } from '@angular/core';
import { GameService, Game } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Field, FieldService } from '../../services/field.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  unverifiedGames: Game[] = [];
  fields: Field[] = [];

  constructor(private gameService: GameService, private fieldService: FieldService,) {}

  ngOnInit(): void {
    this.loadUnverifiedGames();
    this.loadFields();
  }

  loadFields(): void {
    this.fieldService.getFields().subscribe((data) => {
      this.fields = data;
    });
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

  getFieldName(fieldId: number): string {
    const field = this.fields.find(f => f.id === fieldId);
    return field ? field.name : 'Nieznane boisko';
  }
}
