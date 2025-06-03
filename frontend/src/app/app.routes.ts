import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { GamesComponent } from './pages/games/games.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ActiviteListComponent } from './components/activite-list/activite-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fields', component: FieldsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'activities', component: ActiviteListComponent },
];