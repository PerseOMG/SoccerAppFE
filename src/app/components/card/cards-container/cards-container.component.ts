import { Component, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../services/teams/teams.facade';
import { Observable } from 'rxjs';
import { CARDS_PAGINATION_CONTROLS } from '../../../../assets/consts/configs/pagination-config';
import { PaginationFacade } from '../../../services/pagination/pagination.facade';
import { Team } from '../../../models/team.models';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
  teams$: Observable<Team[]> = this.teamsFacade.selectAllTeams();
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();
  filter = this.paginationFacade.getFilter();
  config = CARDS_PAGINATION_CONTROLS;
  cardOptions = {
    allowAnimations: true,
    isSelectable: true,
    showDetails: true,
  };
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
