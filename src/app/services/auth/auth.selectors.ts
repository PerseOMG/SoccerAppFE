import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const selectStore = (state: AppState) => state;

export const selectUser = createSelector(
  selectStore,
  (state: AppState) => state.user
);

export const authSelectors = {
  selectUser,
};
