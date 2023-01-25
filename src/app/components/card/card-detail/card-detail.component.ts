import { Component, OnInit } from '@angular/core';
import { Team } from '../../../models/team.models';
import { TeamsFacade } from '../../../services/teams/teams.facade';
import { Observable } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
  animations: [
    trigger('appearAnimation', [
      state(
        'void',
        style({
          height: '0px',
          padding: '0',
          border: 'none',
        })
      ),
      state(
        'selected',
        style({
          height: '*',
        })
      ),
      transition('void <=> selected', [animate('1s 500ms ease-in-out')]),
    ]),
  ],
})
export class CardDetailComponent implements OnInit {
  team$!: Observable<Team>;

  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {
    this.team$ = this.teamsFacade.getTeamSelected();
  }

  onFavorite(team: Team) {
    this.teamsFacade.setFavoriteTeam(team);
  }

  onCloseCard() {
    this.teamsFacade.setTeamSelected(null);
  }
}
