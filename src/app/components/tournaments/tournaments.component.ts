import { Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';
import { PaginationFacade } from '../../services/pagination/pagination.facade';
import { CARDS_PAGINATION_CONTROLS } from '../../../assets/consts/configs/pagination-config';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit, OnDestroy {
  tournaments$ = this.tournamentFacade.selectAllTournaments();
  filter = this.paginationFacade.getFilter();
  config = CARDS_PAGINATION_CONTROLS;
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();
  currentPage$ = this.paginationFacade.getCurrentPage();
  itemsPerPage$ = this.paginationFacade.getItemsPerPage();
  constructor(
    private tournamentFacade: TournamentsFacade,
    private paginationFacade: PaginationFacade
  ) {}

  ngOnInit(): void {}

  onPageChange(page: number) {
    this.paginationFacade.setCurrentPage(page);
  }

  ngOnDestroy(): void {
    this.paginationFacade.setFilter('');
    this.paginationFacade.setCurrentPage(0);
    this.paginationFacade.setItemsPerPage(10);
  }
}
