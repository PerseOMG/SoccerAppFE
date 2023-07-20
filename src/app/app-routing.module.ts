import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsContainerComponent } from './components/card/cards-container/cards-container.component';
import { TeamDetailsComponent } from './components/teams/team-details/team-details.component';
import { CreditsPageComponent } from './components/common/credits-page/credits-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreateFormComponent } from './components/shared/create/create-form/create-form.component';
import { TournamentDetailsComponent } from './components/tournaments/tournament-details/tournament-details.component';
import { PlayTournamentDashboardComponent } from './components/play-tournament-dashboard/play-tournament-dashboard.component';

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
    component: CardsContainerComponent,
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
  { path: 'thanksTo', component: CreditsPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'notFound', component: NotfoundComponent },
  { path: 'logout', redirectTo: '/login' },
  { path: '**', pathMatch: 'full', redirectTo: '/notFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
