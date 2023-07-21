import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/navigation/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamCardComponent } from './components/teams/team-card.component';
import { TeamsCardsContainerComponent } from './components/teams/teams-container/teams-container.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { TeamsEffects } from './state/teams/teams.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TeamDetailsComponent } from './components/teams/team-details/team-details.component';
import { FooterComponent } from './components/shared/navigation/footer/footer.component';
import { CreditsPageComponent } from './components/shared/credits-page/credits-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltersComponent } from './components/shared/filter/filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringFilterPipe } from './pipes/string-filter.pipe';
import { LoginComponent } from './components/forms/auth/login/login.component';
import { AuthEffects } from './state/auth/auth.effects';
import { RegisterComponent } from './components/forms/auth/register/register.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreateButtonComponent } from './components/shared/action-button/action-button.component';
import { CreateFormComponent } from './components/forms/create-form/create-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragAndDropComponent } from './components/shared/drag-and-drop/drag-and-drop.component';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { TournamentsEffects } from './state/tournaments/tournaments.effects';
import { TournamentsCardComponent } from './components/tournaments/tournaments-card/tournaments-card.component';
import { TournamentDetailsComponent } from './components/tournaments/tournament-details/tournament-details.component';
import { PlayTournamentDashboardComponent } from './components/play-tournament-dashboard/play-tournament-dashboard.component';
import { PositionTableComponent } from './components/play-tournament-dashboard/position-table/position-table.component';
import { PlayoffsComponent } from './components/play-tournament-dashboard/playoffs/playoffs.component';
import { CalendarComponent } from './components/play-tournament-dashboard/calendar/calendar.component';
import { NoDataComponent } from './components/shared/no-data/no-data.component';

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
    StatisticsComponent,
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
