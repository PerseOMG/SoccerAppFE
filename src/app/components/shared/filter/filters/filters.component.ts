import { Component, OnInit } from '@angular/core';
import { PaginationFacade } from '../../../../services/pagination/pagination.facade';
import { TItemsPerPageOptions } from '../../../../../assets/consts/configs/pagination-config';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor(private paginationFacade: PaginationFacade) {}
  filter = '';
  itemsPerPageOptions: TItemsPerPageOptions[] = [5, 10, 15, 20];
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();
  ngOnInit(): void {}

  onKey() {
    this.paginationFacade.setFilter(this.filter);
  }

  changeItemsPerPage(option: TItemsPerPageOptions) {
    this.paginationFacade.setItemsPerPage(option);
  }
}
