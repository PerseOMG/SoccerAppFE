import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.models';
import { TeamsFacade } from '../../state/teams/teams.facade';
import { Router } from '@angular/router';

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
  ],
})
export class CardComponent implements OnInit {
  @Input() team!: Team;
  @Input() options: {
    allowAnimations: boolean;
    isSelectable: boolean;
    showDetails: boolean;
  } = {
    allowAnimations: false,
    isSelectable: false,
    showDetails: false,
  };

  isMouseIn = false;
  selectedCardId = 'NA';
  openMenu = false;
  constructor(private teamsFacade: TeamsFacade, private router: Router) {}

  ngOnInit(): void {}

  onMouseEvent() {
    if (this.options.allowAnimations) this.isMouseIn = !this.isMouseIn;
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
    this.router.navigate(['teams', team._id]);
  }

  onFavorite(team: Team) {
    this.teamsFacade.setFavoriteTeam(team);
  }

  getStarsArray(stars: number): any[] {
    return Array.from({ length: stars });
  }

  onDelete(id: string) {
    this.teamsFacade.deleteTeam(id);
  }

  onEdit(id: string) {}
}
