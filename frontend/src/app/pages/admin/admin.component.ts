import { Component } from '@angular/core';
import { ActiviteListComponent } from "../../components/activite-list/activite-list.component";
import { FieldListComponent } from "../../components/field-list/field-list.component";
import { GameListComponent } from "../../components/game-list/game-list.component";
import { TeamsComponent } from "../../components/teams/teams.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ActiviteListComponent, FieldListComponent, GameListComponent, TeamsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {}
