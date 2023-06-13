import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as paginationActions from './pagination.actions';
import { paginationSelectors } from './pagination.selectors';
import { TItemsPerPageOptions } from '../../../assets/consts/configs/pagination-config';

@Injectable({
  providedIn: 'root',
})
export class PaginationFacade {
  // Selectors
  getItemsPerPage = () => this.store.select(paginationSelectors.itemsPerPage);
  getCurrentPage = () => this.store.select(paginationSelectors.currentPage);
  getFilter = () => this.store.select(paginationSelectors.filter);
  getTournament = () => this.store.select(paginationSelectors.tournament);

  // Actions
  setCurrentPage = (currentPage: number) =>
    this.store.dispatch(new paginationActions.SetCurrentPage(currentPage));

  setItemsPerPage = (itemsPerPage: TItemsPerPageOptions) =>
    this.store.dispatch(new paginationActions.SetItemsPerPage(itemsPerPage));

  setFilter = (filter: string) =>
    this.store.dispatch(new paginationActions.SetFilter(filter));

  setTournamentFilter = (tournament: string) =>
    this.store.dispatch(new paginationActions.SetTournamentFilter(tournament));

  constructor(private store: Store<AppState>) {}
}
