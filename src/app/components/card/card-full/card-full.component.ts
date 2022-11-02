import { Component, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../services/teams/teams.facade';
import { Team } from '../../../models/team.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-full',
  templateUrl: './card-full.component.html',
  styleUrls: ['./card-full.component.scss'],
})
export class CardFullComponent implements OnInit {
  team$ = this.teamsFacade.getTeamSelected();
  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {}
}
