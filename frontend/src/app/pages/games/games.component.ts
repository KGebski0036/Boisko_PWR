import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { FieldService, Field } from '../../services/field.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-games',
  standalone: true,
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  fields: Field[] = [];

  constructor(
    private gameService: GameService,
    private fieldService: FieldService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadFields();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }

  loadFields(): void {
    this.fieldService.getFields().subscribe((data) => {
      this.fields = data;
    });
  }

  getFieldName(fieldId: number): string {
    const field = this.fields.find(f => f.id === fieldId);
    return field ? field.name : 'Nieznane boisko';
  }

  goToAddGame(): void {
    this.router.navigate(['/addgame']);
  }
}
