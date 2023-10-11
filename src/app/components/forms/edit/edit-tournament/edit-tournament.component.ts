import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, switchMap, take } from 'rxjs';
import { TournamentsFacade } from '../../../../state/tournaments/tournaments.facade';
import { AppTitleService } from '../../../../services/appTitle/app-title.service';
import { SweetAlertsService } from '../../../../services/alerts/sweet-alerts.service';
import {
  FORM_ALERTS,
  TOURNAMENT_ALERTS,
} from '../../../../../assets/consts/configs/alerts-config.const';
import { TeamsFacade } from '../../../../state/teams/teams.facade';
import { ITournament } from '../../../../models/tournament.model';
import {
  TOURNAMENTS_DEFINITION_OPTIONS,
  TOURNAMENTS_QUANTITY_OPTIONS,
} from 'src/assets/consts/configs/forms-config.consts';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.scss'],
})
export class EditTournamentComponent implements OnInit {
  editTournamentForm: FormGroup;
  id$ = this.route.params.pipe(map((params) => params['id']));
  teamsOptions$ = combineLatest([this.teamsFacade.selectAllTeams()]).pipe(
    map(([teams]) =>
      teams?.map((team) => ({
        name: team?.name,
        id: team._id,
      }))
    )
  );
  playoffQuantityOptions = TOURNAMENTS_QUANTITY_OPTIONS;
  winnerDefinitionOptions = TOURNAMENTS_DEFINITION_OPTIONS;
  tournamentValues$ = combineLatest([this.id$]).pipe(
    switchMap(([id]) => this.tournamentsFacade.selectTournamentByName(id)),
    map((tournament) => tournament)
  );

  constructor(
    private route: ActivatedRoute,
    private tournamentsFacade: TournamentsFacade,
    private titleService: AppTitleService,
    private alertService: SweetAlertsService,
    private router: Router,
    private teamsFacade: TeamsFacade
  ) {}

  ngOnInit(): void {
    this.titleService.setDocTitle(`Edit Tournament`);
    this.tournamentValues$.subscribe((tournament) => {
      if (!tournament) {
        this.alertService.fireAlert(TOURNAMENT_ALERTS['notFound'], () => {
          this.router.navigate(['/']);
        });
      }
      this.editTournamentForm = new FormGroup({
        logo: new FormControl(tournament?.logo, [Validators.required]),
        name: new FormControl(tournament?.name, [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ]),
        teams: new FormControl(
          tournament?.teams.map((team) => team._id),
          Validators.required
        ),
        options: new FormGroup({
          winnerDefinition: new FormControl(
            [tournament?.options?.winnerDefinition],
            Validators.required
          ),
          playoffsQuantity: new FormControl(
            [tournament?.options?.playoffsQuantity],
            Validators.required
          ),
        }),
      });
    });
  }

  onSubmit() {
    if (
      this.editTournamentForm.get('teams').value.length >=
        Number(this.editTournamentForm.get('options.playoffsQuantity').value) +
          1 ||
      this.editTournamentForm.get('options.winnerDefinition').value === 'points'
    ) {
      const tournament: ITournament = {
        options: {
          winnerDefinition: this.editTournamentForm.get(
            'options.winnerDefinition'
          ).value[0],
          playoffsQuantity: this.editTournamentForm.get(
            'options.playoffsQuantity'
          )?.value[0],
        },
        name: this.editTournamentForm.get('name').value,
        teams: this.editTournamentForm.get('teams').value,
        logo: this.editTournamentForm.get('logo').value,
      };
      this.tournamentValues$
        .pipe(take(1))
        .subscribe((unEditedTournament) =>
          this.tournamentsFacade.editTournament(
            tournament,
            unEditedTournament._id
          )
        );
    } else {
      this.alertService.fireAlert(FORM_ALERTS['teamsAmountError']);
    }
  }

  getMultipleInputLabel() {
    return this.editTournamentForm?.get('teams')?.value?.length === 0
      ? 'Teams'
      : null;
  }

  getPlayoffsQuantityOptionsLabel() {
    return this.editTournamentForm?.get('options.playoffsQuantity')?.value
      ?.length === 0
      ? 'Playoffs Quantity'
      : null;
  }

  getWinnerDefinitionOptionsLabel() {
    return this.editTournamentForm?.get('options.winnerDefinition')?.value
      ?.length === 0
      ? 'Winner Definition'
      : null;
  }
}
