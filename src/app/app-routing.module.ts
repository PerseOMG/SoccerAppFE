import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsContainerComponent } from './components/card/cards-container/cards-container.component';
import { CardFullComponent } from './components/card/card-full/card-full.component';
import { CreditsPageComponent } from './components/common/credits-page/credits-page.component';

const routes: Routes = [
  { path: 'teams', component: CardsContainerComponent },
  { path: 'details', component: CardFullComponent },
  { path: 'thanksTo', component: CreditsPageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/teams' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
