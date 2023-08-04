import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { TournamentsFacade } from '../../../../state/tournaments/tournaments.facade';
import { AppTitleService } from '../../../../services/appTitle/app-title.service';
import { SweetAlertsService } from '../../../../services/alerts/sweet-alerts.service';
import { TOURNAMENT_ALERTS } from '../../../../../assets/consts/configs/alerts-config.const';
import { TeamsFacade } from '../../../../state/teams/teams.facade';

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
  tournamentValues$ = combineLatest([this.id$]).pipe(
    switchMap(([id]) => this.tournamentsFacade.selectTournamentById(id)),
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
      });
    });
  }

  onSubmit() {
    console.log(this.editTournamentForm.value);
  }

  getMultipleInputLabel() {
    return this.editTournamentForm?.get('teams')?.value?.length === 0
      ? 'Teams'
      : null;
  }
}
