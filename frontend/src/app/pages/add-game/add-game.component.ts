import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService, AddGame } from '../../services/game.service';
import { FieldService, Field } from '../../services/field.service';

type BookingType = 'NORMAL' | 'TURNAMENT';

@Component({
  selector: 'app-add-game',
  standalone: true,
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddGameComponent implements OnInit {
  gameForm!: FormGroup;
  success = false;
  error: string | null = null;
  verifiedFields: Field[] = [];
  bookingType: BookingType = 'NORMAL';
  successMessage = '';

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
      weight_tournament: [null]
    });

    this.loadVerifiedFields();
  }

  loadVerifiedFields(): void {
    this.fieldService.getFields().subscribe({
      next: data => {
        this.verifiedFields = data.filter(field => field.is_verified);
      },
      error: err => console.error('Błąd ładowania zweryfikowanych boisk', err)
    });
  }

  setBookingType(type: BookingType): void {
    this.bookingType = type;
    const weightControl = this.gameForm.get('weight_tournament');

    if (type === 'TURNAMENT') {
      weightControl?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      weightControl?.clearValidators();
      weightControl?.reset();
    }
    weightControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    this.success = false;
    this.error = null;

    if (this.gameForm.invalid) {
      this.error = "Proszę wypełnić wszystkie wymagane pola poprawnie.";
      return;
    }

    const { start_date, end_date, weight_tournament } = this.gameForm.value;

    if (new Date(end_date) <= new Date(start_date)) {
      this.error = "Data zakończenia musi być późniejsza niż data rozpoczęcia.";
      return;
    }

    const isTournament = this.bookingType === 'TURNAMENT';

    const gameData: AddGame = {
      ...this.gameForm.value,
      booking_type: this.bookingType,
      is_tournament_verified: !isTournament,
      weight_tournament: isTournament ? weight_tournament : null
    };

    this.gameService.addGame(gameData).subscribe({
      next: () => {
        this.success = true;
        this.successMessage = isTournament
          ? "Turniej został zgłoszony i oczekuje na weryfikację administratora."
          : "Gra została pomyślnie dodana i jest widoczna na liście.";
        this.gameForm.reset();
        setTimeout(() => this.router.navigate(['/games']), 2500);
      },
      error: err => {
        this.error = err.error?.detail || 'Wystąpił nieznany błąd serwera.';
      }
    });
  }
}
