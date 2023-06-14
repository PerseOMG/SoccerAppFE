import { Component, Input, OnInit } from '@angular/core';
import { PaginationFacade } from '../../../../services/pagination/pagination.facade';
import { TItemsPerPageOptions } from '../../../../../assets/consts/configs/pagination-config';
import { TournamentsFacade } from 'src/app/services/tournaments/tournaments.facade';
import { BehaviorSubject, filter, map } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() cardsType: string;
  filter = '';
  itemsPerPageOptions: TItemsPerPageOptions[] = [5, 10, 15, 20];
  itemsPerPageSelected$ = this.paginationFacade.getItemsPerPage();
  tournamentsOptions$ = this.tournamentFacade.selectAllTournaments().pipe(
    filter((tournamentsData) => !!tournamentsData.tournaments),
    map((tournamentsData) =>
      tournamentsData?.tournaments?.map((tournament) => tournament?.name)
    )
  );
  tournamentFilterSelected$ = this.paginationFacade.getTournament();
  showMoreOptions = new BehaviorSubject(false);

  constructor(
    private paginationFacade: PaginationFacade,
    private tournamentFacade: TournamentsFacade
  ) {}

  ngOnInit(): void {}

  setShowOptions() {
    this.showMoreOptions.next(!this.showMoreOptions.value);
  }

  onKey() {
    this.paginationFacade.setFilter(this.filter);
  }

  changeItemsPerPage(option: TItemsPerPageOptions) {
    this.paginationFacade.setItemsPerPage(option);
  }

  changeTournamentFilter(tournamentName: string) {
    this.paginationFacade.setTournamentFilter(tournamentName);
  }
}
