import { Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../state/tournaments/tournaments.facade';
import { PaginationFacade } from '../../state/pagination/pagination.facade';
import { CARDS_PAGINATION_CONTROLS } from '../../../assets/consts/configs/pagination-config';
import { AppTitleService } from '../../services/appTitle/app-title.service';

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
    private paginationFacade: PaginationFacade,
    private titleService: AppTitleService
  ) {
    this.titleService.setDocTitle('All Tournaments');
  }

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
