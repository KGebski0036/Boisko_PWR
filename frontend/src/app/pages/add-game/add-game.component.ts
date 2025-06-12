import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService, AddGame } from '../../services/game.service';
import { FieldService, Field } from '../../services/field.service';

@Component({
  selector: 'app-add-game',
  standalone: true,
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddGameComponent implements OnInit {
  gameForm!: FormGroup;
  success = false;
  fields: Field[] = [];

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private fieldService: FieldService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      game_name: ['', Validators.required],
      field_id: [null, Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      booking_type: ['NORMAL', Validators.required],
      weight_tournament: [null]
    });

    this.fieldService.getFields().subscribe({
      next: data => this.fields = data,
      error: err => console.error('Błąd ładowania boisk', err)
    });
  }

onSubmit(): void {
  if (this.gameForm.valid) {
    const gameData: AddGame = {
      ...this.gameForm.value,
      is_tournament_verified: false
    };
    this.gameService.addGame(gameData).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(['/games']);
      },
      error: err => console.error('Error adding game', err)
    });
  }
}

}
