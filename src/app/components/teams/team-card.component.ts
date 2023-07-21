import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../../models/team.models';
import { TeamsFacade } from '../../state/teams/teams.facade';
import { CARDS_ANIMATIONS } from '../../../assets/consts/animations/card.animations.consts';

interface TeamCardOptions {
  allowAnimations: boolean;
  isSelectable: boolean;
  showDetails: boolean;
}

@Component({
  selector: 'app-teams-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
  animations: [CARDS_ANIMATIONS.hover],
})
export class TeamCardComponent implements OnInit {
  @Input() team!: Team;
  @Input() options: TeamCardOptions = {
    allowAnimations: false,
    isSelectable: false,
    showDetails: false,
  };

  // Animations
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