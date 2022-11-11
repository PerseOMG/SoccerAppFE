import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
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
import { FooterComponent } from './components/shared/footer/footer.component';
import { CreditsPageComponent } from './components/common/credits-page/credits-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltersComponent } from './components/shared/filter/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { StringFilterPipe } from './pipes/string-filter.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TeamsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
