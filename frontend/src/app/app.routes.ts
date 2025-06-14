import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { GamesComponent } from './pages/games/games.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddFieldComponent } from './pages/add-field/add-field.component';
import { AddGameComponent } from './pages/add-game/add-game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fields', component: FieldsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'addfield', component: AddFieldComponent },
  { path: 'addgame', component: AddGameComponent }
];
