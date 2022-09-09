import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';
import { CardsContainerComponent } from './components/cards-container/cards-container.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { teamsEffects } from './services/teams/teams.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    CardsContainerComponent,
    CardDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([teamsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
