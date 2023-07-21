import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../state/teams/teams.facade';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { CARDS_PAGINATION_CONTROLS } from '../../../../assets/consts/configs/pagination-config';
import { PaginationFacade } from '../../../state/pagination/pagination.facade';
import { Team } from '../../../models/team.models';
import { AppTitleService } from '../../../services/appTitle/app-title.service';

@Component({
  selector: 'app-teams-container',
  templateUrl: './teams-container.component.html',
  styleUrls: ['./teams-container.component.scss'],
})
export class TeamsCardsContainerComponent implements OnInit, OnDestroy {
  itemsPerPageSelected = this.paginationFacade.getItemsPerPage();
  filter = this.paginationFacade.getFilter();
  currentPage$ = this.paginationFacade.getCurrentPage();
  itemsPerPage$ = this.paginationFacade.getItemsPerPage();
  config = CARDS_PAGINATION_CONTROLS;
  cardOptions = {
    allowAnimations: true,
    isSelectable: true,
    showDetails: true,
  };

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
    this.paginationFacade.resetFilters();
  }
}
