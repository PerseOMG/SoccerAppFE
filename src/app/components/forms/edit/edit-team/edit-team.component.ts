import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { AppTitleService } from '../../../../services/appTitle/app-title.service';
import { TeamsFacade } from '../../../../state/teams/teams.facade';
import { TournamentsFacade } from '../../../../state/tournaments/tournaments.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertsService } from '../../../../services/alerts/sweet-alerts.service';
import { TEAMS_ALERTS } from '../../../../../assets/consts/configs/alerts-config.const';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  editTeamForm: FormGroup;
  id$ = this.route.params.pipe(map((params) => params['id']));
  tournamentsOptions$ = combineLatest([
    this.tournamentsFacade.selectAllTournaments(),
  ]).pipe(
    map(([tournaments]) =>
      tournaments?.tournaments?.map((tournament) => ({
        name: tournament?.name,
        id: tournament._id,
      }))
    )
  );
  teamValues$ = combineLatest([this.id$]).pipe(
    switchMap(([id]) => this.teamsFacade.getTeamSelected(id)),
    map((teamValue) => teamValue)
  );

  constructor(
    private route: ActivatedRoute,
    private titleService: AppTitleService,
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private router: Router,
    private alertService: SweetAlertsService
  ) {}

  ngOnInit(): void {
    this.titleService.setDocTitle(`Edit Team`);
    this.teamValues$.subscribe((team) => {
      if (!team) {
        this.alertService.fireAlert(TEAMS_ALERTS['notFound'], () => {
          this.router.navigate(['/']);
        });
      }
      this.editTeamForm = new FormGroup({
        logo: new FormControl(team?.logo, [Validators.required]),
        name: new FormControl(team?.name, [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ]),
        tournaments: new FormControl(
          team?.tournaments.map((tournament) => tournament._id),
          Validators.required
        ),
      });
    });
  }

  onSubmit() {
    this.id$.subscribe((id) => {
      this.teamsFacade.editTeam(this.editTeamForm.value, id);
    });
  }

  getMultipleInputLabel() {
    return this.editTeamForm?.get('tournaments')?.value?.length === 0
      ? 'tournaments'
      : null;
  }
}
