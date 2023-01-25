import { Component, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';
import { PaginationFacade } from '../../services/pagination/pagination.facade';
import { CARDS_PAGINATION_CONTROLS } from '../../../assets/consts/configs/pagination-config';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  tournaments$ = this.tournamentFacade.selectAllTournaments();
  filter = this.paginationFacade.getFilter();
  config = CARDS_PAGINATION_CONTROLS;
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();

  constructor(
    private tournamentFacade: TournamentsFacade,
    private paginationFacade: PaginationFacade
  ) {}

  ngOnInit(): void {}

  getCurrentPage(): number {
    let currentPage: number;
    this.paginationFacade.getCurrentPage().subscribe((val) => {
      currentPage = val;
    });
    return currentPage;
  }

  getItemsPerPage(): number {
    let itemsPerPage: number;
    this.paginationFacade.getItemsPerPage().subscribe((val) => {
      itemsPerPage = val;
    });

    return itemsPerPage;
  }

  onPageChange(page: number) {
    this.paginationFacade.setCurrentPage(page);
  }
}
