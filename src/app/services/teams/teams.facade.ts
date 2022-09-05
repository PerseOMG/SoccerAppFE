import { Injectable } from '@angular/core';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsFacade {
  getAllTeams = () => this.teamsService.getAllTeams();

  constructor(private teamsService: TeamsService) {}
}
