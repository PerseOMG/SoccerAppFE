import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragulaService, DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StringFilterPipe } from './pipes/string-filter.pipe';
import { HeaderComponent } from './components/shared/navigation/header/header.component';
import { environment } from '../environments/environment';
import { TeamDetailsComponent } from './components/teams/team-details/team-details.component';
import { FooterComponent } from './components/shared/navigation/footer/footer.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { CreateButtonComponent } from './components/shared/action-button/action-button.component';
import { TournamentsCardComponent } from './components/tournaments/tournaments-card/tournaments-card.component';
import { TournamentDetailsComponent } from './components/tournaments/tournament-details/tournament-details.component';
import { PlayTournamentDashboardComponent } from './components/play-tournament-dashboard/play-tournament-dashboard.component';
import { PositionTableComponent } from './components/play-tournament-dashboard/position-table/position-table.component';
import { PlayoffsComponent } from './components/play-tournament-dashboard/playoffs/playoffs.component';
import { CalendarComponent } from './components/play-tournament-dashboard/calendar/calendar.component';
import { NoDataComponent } from './components/shared/no-data/no-data.component';
import { FiltersComponent } from './components/shared/filters/filters.component';
import { TeamCardComponent } from './components/teams/team-card.component';
import { TeamsCardsContainerComponent } from './components/teams/teams-container/teams-container.component';
import { CreditsPageComponent } from './components/shared/credits-page/credits-page.component';
import { LoginComponent } from './components/forms/auth/login/login.component';
import { RegisterComponent } from './components/forms/auth/register/register.component';
import { CreateFormComponent } from './components/forms/create-form/create-form.component';
import { DragAndDropComponent } from './components/shared/drag-and-drop/drag-and-drop.component';
import { reducers } from './state/index';
import { TeamsEffects } from './state/teams/teams.effects';
import { AuthEffects } from './state/auth/auth.effects';
import { TournamentsEffects } from './state/tournaments/tournaments.effects';
import { EditTeamComponent } from './components/forms/edit/edit-team/edit-team.component';
import { EditTournamentComponent } from './components/forms/edit/edit-tournament/edit-tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamCardComponent,
    TeamsCardsContainerComponent,
    TeamDetailsComponent,
    FooterComponent,
    CreditsPageComponent,
    FiltersComponent,
    StringFilterPipe,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    TournamentsComponent,
    CreateButtonComponent,
    CreateFormComponent,
    DragAndDropComponent,
    TournamentsCardComponent,
    TournamentDetailsComponent,
    PlayTournamentDashboardComponent,
    PositionTableComponent,
    PlayoffsComponent,
    CalendarComponent,
    NoDataComponent,
    EditTeamComponent,
    EditTournamentComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TeamsEffects, AuthEffects, TournamentsEffects]),
  ],
  providers: [DragulaService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
