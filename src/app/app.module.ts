import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/navigation/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';
import { CardsContainerComponent } from './components/card/cards-container/cards-container.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './services';
import { EffectsModule } from '@ngrx/effects';
import { TeamsEffects } from './services/teams/teams.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CardDetailComponent } from './components/card/card-detail/card-detail.component';
import { CardFullComponent } from './components/card/card-full/card-full.component';
import { FooterComponent } from './components/shared/navigation/footer/footer.component';
import { CreditsPageComponent } from './components/common/credits-page/credits-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltersComponent } from './components/shared/filter/filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringFilterPipe } from './pipes/string-filter.pipe';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthEffects } from './services/auth/auth.effects';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreateButtonComponent } from './components/shared/create/create-button/create-button.component';
import { CreateFormComponent } from './components/shared/create/create-form/create-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragAndDropComponent } from './components/shared/create/drag-and-drop/drag-and-drop.component';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { TournamentsEffects } from './services/tournaments/tournaments.effects';
import { TournamentsCardComponent } from './components/tournaments/tournaments-card/tournaments-card.component';

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
  providers: [DragulaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
