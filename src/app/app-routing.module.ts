import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsContainerComponent } from './components/cards-container/cards-container.component';

const routes: Routes = [
  { path: 'teams', component: CardsContainerComponent },
  { path: '', pathMatch: 'full', redirectTo: '/teams' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
