import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, of } from 'rxjs';
import { IFormFields } from '../../../models/form-fields.model';
import { FORMS_CONFIG } from '../../../../assets/consts/configs/forms-config.consts';
import { AppTitleService } from '../../../services/appTitle/app-title.service';
import { TeamsFacade } from '../../../state/teams/teams.facade';
import { TournamentsFacade } from '../../../state/tournaments/tournaments.facade';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  model$ = this.route.params.pipe(map((params) => params['model']));
  id$ = this.route.params.pipe(map((params) => params['id']));
  filterFields: IFormFields[];
  modelValues$ = combineLatest([this.model$, this.id$]).pipe(
    map(([model, id]) => {
      if (model === 'team') {
        return this.teamsFacade.getTeamSelected(id);
      }
      return this.tournamentsFacade.selectTournamentById(id);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private titleService: AppTitleService,
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade
  ) {
    this.model$.subscribe((model) => {
      this.titleService.setDocTitle(`Edit ${model}`);
      this.filterFields = FORMS_CONFIG[model] as IFormFields[];
    });
  }

  ngOnInit(): void {}
}
