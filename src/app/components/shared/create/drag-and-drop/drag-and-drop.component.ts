import { Component, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../../services/teams/teams.facade';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
  teams = this.teamsFacade.selectAllTeams();
  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {}
}
