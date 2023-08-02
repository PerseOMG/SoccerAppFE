import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsCardsContainerComponent } from './components/teams/teams-container/teams-container.component';
import { TeamDetailsComponent } from './components/teams/team-details/team-details.component';
import { CreditsPageComponent } from './components/shared/credits-page/credits-page.component';
import { LoginComponent } from './components/forms/auth/login/login.component';
import { RegisterComponent } from './components/forms/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { CreateFormComponent } from './components/forms/create-form/create-form.component';
import { TournamentDetailsComponent } from './components/tournaments/tournament-details/tournament-details.component';
import { PlayTournamentDashboardComponent } from './components/play-tournament-dashboard/play-tournament-dashboard.component';
import { EditTeamComponent } from './components/forms/edit/edit-team/edit-team.component';
import { EditTournamentComponent } from './components/forms/edit/edit-tournament/edit-tournament.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'teams/:id',
    component: TeamDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teams',
    component: TeamsCardsContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tournamentDetails/:id',
    component: TournamentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playTournament/:id',
    component: PlayTournamentDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details',
    component: TeamDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create/:model',
    component: CreateFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/team/:id',
    component: EditTeamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/tournament/:id',
    component: EditTournamentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'thanksTo', component: CreditsPageComponent },
  { path: 'notFound', component: NotfoundComponent },
  { path: 'logout', redirectTo: '/login' },
  { path: '**', pathMatch: 'full', redirectTo: '/notFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
