import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../state/teams/teams.facade';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { CARDS_PAGINATION_CONTROLS } from '../../../../assets/consts/configs/pagination-config';
import { PaginationFacade } from '../../../state/pagination/pagination.facade';
import { Team } from '../../../models/team.models';
import { AppTitleService } from '../../../state/appTitle/app-title.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit, OnDestroy {
  teams$: Observable<Team[]> = combineLatest([
    this.teamsFacade.selectAllTeams(),
    this.paginationFacade.getTournament(),
  ]).pipe(
    map(([teams, tournamentFilter]) => {
      if (!tournamentFilter) {
        return teams;
      }

      const filteredTeams = teams.filter((team) =>
        team.tournaments.some(
          (tournament) => tournament.name === tournamentFilter
        )
      );

      return filteredTeams;
    })
  );
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();
  filter = this.paginationFacade.getFilter();
  config = CARDS_PAGINATION_CONTROLS;
  cardOptions = {
    allowAnimations: true,
    isSelectable: true,
    showDetails: true,
  };

  currentPage$ = this.paginationFacade.getCurrentPage();
  itemsPerPage$ = this.paginationFacade.getItemsPerPage();

  constructor(
    private teamsFacade: TeamsFacade,
    private paginationFacade: PaginationFacade,
    private titleService: AppTitleService
  ) {
    this.titleService.setDocTitle('All Teams');
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
