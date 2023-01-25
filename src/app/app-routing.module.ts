import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsContainerComponent } from './components/card/cards-container/cards-container.component';
import { CardFullComponent } from './components/card/card-full/card-full.component';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'teams',
    component: CardsContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tournaments',
    component: TournamentsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'details', component: CardFullComponent, canActivate: [AuthGuard] },
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
