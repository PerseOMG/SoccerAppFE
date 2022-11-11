export interface IPaginationOptions {
  id: string;
  itemsPerPage?: number;
  currentPage?: number;
  totalItems?: number;
}

export interface IPaginationControl {
  id: string;
  maxSize?: number;
  directionLinks: boolean;
  autoHide: boolean;
  responsive: boolean;
  previousLabel: string;
  nextLabel: string;
  screenReaderPaginationLabel?: string;
  screenReaderPageLabel?: string;
  screenReaderCurrentLabel?: string;
}
