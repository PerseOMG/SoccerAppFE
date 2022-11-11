import { IPaginationControl } from '../../../app/models/pagination-options.model';

export const CARDS_PAGINATION_CONTROLS: IPaginationControl = {
  id: 'cards_pagination',
  directionLinks: true,
  autoHide: false,
  responsive: true,
  previousLabel: 'Back',
  nextLabel: 'Next',
  maxSize: 5,
};

export type TItemsPerPageOptions = 5 | 10 | 15 | 20;
