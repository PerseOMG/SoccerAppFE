import { Component, OnInit } from '@angular/core';
import { TeamsFacade } from '../../services/teams/teams.facade';
import { Observable } from 'rxjs';
import { ITeamsState } from '../../services/teams/teams.reducer';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
  teams$!: Observable<ITeamsState>;
  constructor(private teamsFacade: TeamsFacade) {
    this.teams$ = teamsFacade.selectAllTeams();
  }

  ngOnInit(): void {}
}
