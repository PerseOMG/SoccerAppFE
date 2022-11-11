import { Component, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../services/teams/teams.facade';
import { combineLatest, Observable } from 'rxjs';
import { ITeamsState } from '../../../services/teams/teams.reducer';
import { CARDS_PAGINATION_CONTROLS } from '../../../../assets/consts/configs/pagination-config';
import { PaginationFacade } from '../../../services/pagination/pagination.facade';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
  teams$: Observable<ITeamsState> = this.teamsFacade.selectAllTeams();
  isTeamSelected$: Observable<boolean> = this.teamsFacade.isTeamSelected();
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();
  filter = this.paginationFacade.getFilter();
  config = CARDS_PAGINATION_CONTROLS;
  constructor(
    private teamsFacade: TeamsFacade,
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
