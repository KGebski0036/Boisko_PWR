// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { GamesComponent } from './pages/games/games.component';
import { TeamsVerifiedComponent } from './pages/teams-verified/teams-verified.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddFieldComponent } from './pages/add-field/add-field.component';
import { AddGameComponent } from './pages/add-game/add-game.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { AddTeamComponent } from './pages/add-team/add-team.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fields', component: FieldsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'teams', component: TeamsVerifiedComponent },
  { path: 'addteam', component: AddTeamComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'addfield', component: AddFieldComponent },
  { path: 'addgame', component: AddGameComponent },
  { path: 'games/:id', component: GameDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
