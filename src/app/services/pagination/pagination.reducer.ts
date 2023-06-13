import { TItemsPerPageOptions } from '../../../assets/consts/configs/pagination-config';
import { EPaginationActions, paginationActions } from './pagination.actions';
export interface IPaginationState {
  currentPage: number;
  itemsPerPage: TItemsPerPageOptions;
  filter: string;
  tournament: string;
}

export const initTeamsState: IPaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  filter: null,
  tournament: null,
};

export function paginationReducer(
  state: IPaginationState = initTeamsState,
  action: paginationActions
): IPaginationState {
  switch (action.type) {
    case EPaginationActions.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case EPaginationActions.SET_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload };
    case EPaginationActions.SET_FILTER:
      return { ...state, filter: action.payload };
    case EPaginationActions.SET_TOURNAMENT_FILTER:
      return { ...state, tournament: action.payload };

    default:
      return state;
  }
}
