import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsFacade } from '../../services/teams/teams.facade';
import { TeamsResponse } from '../../models/team.models';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
  teams$: Observable<TeamsResponse> = this.teamsFacade.getAllTeams();

  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {}
}
