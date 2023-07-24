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
import { CardComponent } from './components/card/card.component';
import { CardsContainerComponent } from './components/card/cards-container/cards-container.component';
import { reducers } from './services';
import { TeamsEffects } from './services/teams/teams.effects';
import { environment } from '../environments/environment';
import { CardDetailComponent } from './components/card/card-detail/card-detail.component';
import { CardFullComponent } from './components/card/card-full/card-full.component';
import { FooterComponent } from './components/shared/navigation/footer/footer.component';
import { CreditsPageComponent } from './components/common/credits-page/credits-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthEffects } from './services/auth/auth.effects';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreateButtonComponent } from './components/shared/action-button/action-button.component';
import { CreateFormComponent } from './components/shared/create/create-form/create-form.component';
import { DragAndDropComponent } from './components/shared/create/drag-and-drop/drag-and-drop.component';
import { TournamentsEffects } from './services/tournaments/tournaments.effects';
import { TournamentsCardComponent } from './components/tournaments/tournaments-card/tournaments-card.component';
import { TournamentDetailsComponent } from './components/tournaments/tournament-details/tournament-details.component';
import { PlayTournamentDashboardComponent } from './components/play-tournament-dashboard/play-tournament-dashboard.component';
import { PositionTableComponent } from './components/play-tournament-dashboard/position-table/position-table.component';
import { PlayoffsComponent } from './components/play-tournament-dashboard/playoffs/playoffs.component';
import { CalendarComponent } from './components/play-tournament-dashboard/calendar/calendar.component';
import { NoDataComponent } from './components/shared/no-data/no-data.component';
import { FiltersComponent } from './components/shared/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    CardsContainerComponent,
    CardDetailComponent,
    CardFullComponent,
    FooterComponent,
    CreditsPageComponent,
    FiltersComponent,
    StringFilterPipe,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    TournamentsComponent,
    ProfileComponent,
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
