import { Action } from '@ngrx/store';
import { TItemsPerPageOptions } from '../../../assets/consts/configs/pagination-config';

export enum EPaginationActions {
  SET_CURRENT_PAGE = '[APP Soccer] SET_CURRENT_PAGE',
  GET_CURRENT_PAGE = '[APP Soccer] GET_CURRENT_PAGE',
  SET_ITEMS_PER_PAGE = '[APP Soccer] SET_ITEMS_PER_PAGE',
  GET_ITEMS_PER_PAGE = '[APP Soccer] GET_ITEMS_PER_PAGE',
  SET_FILTER = '[APP Soccer] SET_FILTER',
  GET_FILTER = '[APP Soccer] GET_FILTER',
  SET_TOURNAMENT_FILTER = '[APP Soccer] SET_TOURNAMENT_FILTER',
  GET_TOURNAMENT_FILTER = '[APP Soccer] GET_TOURNAMENT_FILTER',
}

export class GetCurrentPage implements Action {
  public readonly type = EPaginationActions.GET_CURRENT_PAGE;
}

export class GetItemsPerPage implements Action {
  public readonly type = EPaginationActions.GET_ITEMS_PER_PAGE;
}

export class GetFilter implements Action {
  public readonly type = EPaginationActions.GET_FILTER;
}

export class GetTournamentFilter implements Action {
  public readonly type = EPaginationActions.GET_TOURNAMENT_FILTER;
}

export class SetCurrentPage implements Action {
  public readonly type = EPaginationActions.SET_CURRENT_PAGE;
  constructor(public payload: number) {}
}

export class SetItemsPerPage implements Action {
  public readonly type = EPaginationActions.SET_ITEMS_PER_PAGE;
  constructor(public payload: TItemsPerPageOptions) {}
}

export class SetFilter implements Action {
  public readonly type = EPaginationActions.SET_FILTER;
  constructor(public payload: string) {}
}

export class SetTournamentFilter implements Action {
  public readonly type = EPaginationActions.SET_TOURNAMENT_FILTER;
  constructor(public payload: string) {}
}

export type paginationActions =
  | GetCurrentPage
  | GetItemsPerPage
  | GetFilter
  | SetCurrentPage
  | SetItemsPerPage
  | SetFilter
  | GetTournamentFilter
  | SetTournamentFilter;
