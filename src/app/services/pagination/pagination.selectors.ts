import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

const selectStore = (state: AppState) => state;

export const currentPage = createSelector(
  selectStore,
  (state: AppState) => state.pagination.currentPage
);

export const itemsPerPage = createSelector(
  selectStore,
  (state: AppState) => state.pagination.itemsPerPage
);

export const filter = createSelector(
  selectStore,
  (state: AppState) => state.pagination.filter
);

export const paginationSelectors = {
  currentPage,
  itemsPerPage,
  filter,
};
