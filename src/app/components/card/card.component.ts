import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.models';
import { TeamsFacade } from '../../services/teams/teams.facade';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('hoverAnimation', [
      state(
        'hover',
        style({
          transform: 'scale(1.2)',
          borderRadius: '25px',
        })
      ),
      transition('void => hover, hover => void', [animate('0.75s ease')]),
    ]),

    trigger('selectAnimation', [
      state(
        'selected',
        style({
          position: 'absolute',
          top: '10%',
          right: '50%',
          borderRadius: '100%',
          height: '0',
          width: '0',
        })
      ),
      state(
        'void',
        style({
          position: 'unset',
        })
      ),
      transition('void => selected ,selected => void', [animate('1s ease')]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() team!: Team;
  isMouseIn = false;
  selectedCardId = 'NA';
  favAux = false;
  options = ['Edit', 'Delete'];

  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {}

  onMouseEvent() {
    this.isMouseIn = !this.isMouseIn;
  }

  selectedCard(id: string) {
    if (this.selectedCardId === 'NA') {
      this.selectedCardId = id;
      setTimeout(() => {
        this.selectedCardId = 'NA';
      }, 750);
    }
  }

  handleTeamSelection(team: Team) {
    this.selectedCard(team._id);
    this.teamsFacade.setTeamSelected(team);
  }

  onFavorite() {
    this.favAux = !this.favAux;
  }
}
