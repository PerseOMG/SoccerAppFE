import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.models';
import { TeamsFacade } from '../../services/teams/teams.facade';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  selectedTeam!: Team;
  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {}
}
