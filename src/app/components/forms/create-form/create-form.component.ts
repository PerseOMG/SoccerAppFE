import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, BehaviorSubject, take, map, filter } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { IFormFields } from '../../../models/form-fields.model';
import { FORMS_CONFIG } from '../../../../assets/consts/configs/forms-config.consts';
import { TeamsFacade } from '../../../state/teams/teams.facade';
import { TournamentsFacade } from '../../../state/tournaments/tournaments.facade';
import { SweetAlertsService } from '../../../services/alerts/sweet-alerts.service';
import {
  FORM_ALERTS,
  TOURNAMENT_ALERTS,
} from 'src/assets/consts/configs/alerts-config.const';
import { ITournament } from '../../../models/tournament.model';
import { AppTitleService } from '../../../services/appTitle/app-title.service';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  dynamicForm: FormGroup;
  dragAndDropItems: Observable<any>;
  model: 'team' | 'tournament';
  filterFields: IFormFields[];
  step = 1;
  tournaments$ = this.tournamentsFacade.selectAllTournaments().pipe(
    map((tournament) =>
      tournament?.tournaments?.map((tournament) =>
        tournament?.teams?.length < 20 ? tournament : undefined
      )
    ),
    filter((tournaments) => !!tournaments),
    map((tournaments) => tournaments.filter((tournament) => !!tournament))
  );
  selectOptions: BehaviorSubject<{ label: string; value: string }[]> =
    new BehaviorSubject([]);

  buttonLabel$ = new Observable((subscriber) => {
    subscriber.next(this.model === 'tournament' ? 'Next' : 'Create');
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teamFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private sweetAlertService: SweetAlertsService,
    private titleService: AppTitleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.model = params['model'];
      this.filterFields = FORMS_CONFIG[this.model] as IFormFields[];
      this.titleService.setDocTitle(`Create ${this.model}`);
      if (this.filterFields) {
        this.dynamicForm = this.generateDynamicForm();
      }
      if (this.model === 'team') {
        this.tournaments$.subscribe((tournaments) => {
          tournaments.forEach((tournament) => {
            this.selectOptions.next([
              ...this.selectOptions.value,
              {
                label: tournament.name,
                value: tournament._id,
              },
            ]);
          });
        });
      }
      if (this.model === 'tournament') {
        this.dragAndDropItems = this.teamFacade.selectAllTeams();
        this.dragAndDropItems.pipe(take(1)).subscribe((teams) => {
          if (teams.length < 3) {
            this.sweetAlertService.fireAlert(
              TOURNAMENT_ALERTS['noTeams'],
              this.router.navigate(['/teams'])
            );
          }
        });
      }
    });
  }

  onSubmit() {
    this.step === 1 && this.model === 'tournament'
      ? this.step++
      : this.handleOnSubmit();
  }

  onSelectChange(item: IFormFields) {
    if (item.changes) {
      const childInputConfig = (
        FORMS_CONFIG[this.model] as IFormFields[]
      ).filter((input) => input.key === item.changes);
      if (
        !this.dynamicForm
          .get(item.key)
          .value.includes(childInputConfig[0].dependsOnValue)
      ) {
        this.dynamicForm
          .get(childInputConfig[0].key)
          .removeValidators(Validators.required);
        this.dynamicForm.get(childInputConfig[0].key).setValue('');
        this.dynamicForm.get(childInputConfig[0].key).updateValueAndValidity();
      }
      // Winner Definition by playoffs
      if (
        this.dynamicForm
          .get(item.key)
          .value.includes(childInputConfig[0].dependsOnValue)
      ) {
        this.dynamicForm
          .get(childInputConfig[0].key)
          .addValidators(Validators.required);
        this.dynamicForm.get(childInputConfig[0].key).setValue('');
        this.dynamicForm.get(childInputConfig[0].key).updateValueAndValidity();
      }
    }
  }

  handleOnSubmit() {
    switch (this.model) {
      case 'team':
        this.teamFacade.createTeam(this.dynamicForm.value);
        break;
      case 'tournament':
        if (
          this.dynamicForm.get('teams').value.length >=
            Number(this.dynamicForm.get('playoffsQuantity').value) + 1 ||
          this.dynamicForm.get('winnerDefinition').value === 'points'
        ) {
          const tournament: ITournament = {
            options: {
              winnerDefinition:
                this.dynamicForm.get('winnerDefinition').value[0],
              playoffsQuantity:
                this.dynamicForm.get('playoffsQuantity')?.value[0],
            },
            name: this.dynamicForm.get('name').value,
            teams: this.dynamicForm.get('teams').value,
            logo: this.dynamicForm.get('logo').value,
          };
          this.tournamentsFacade.createTournament(tournament);
        } else {
          this.sweetAlertService.fireAlert(FORM_ALERTS['teamsAmountError']);
        }
        break;
    }
  }

  onClose(key: string, message: string, max: number) {
    return this.dynamicForm.get(key).value.length > max ? message : null;
  }

  getDependableVisibility(item: any) {
    return this.dynamicForm
      .get(item.dependsOn)
      .value.includes(item.dependsOnValue);
  }

  generateDynamicForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.filterFields.forEach((field) => {
      baseForm.addControl(
        field.key,
        new FormControl('', this.getValidators(field.validators))
      );
    });
    return baseForm;
  }

  getValidators(validators: string[]) {
    const validatorsArr: any = [];
    validators.forEach((key) => {
      let keySplitted;
      if (key.includes(':')) {
        keySplitted = key.split(':');
      }
      if (key === 'required') validatorsArr.push(Validators.required);
      if (key.includes('maxLength'))
        validatorsArr.push(Validators.maxLength(Number(keySplitted[1].trim())));
      if (key.includes('minLength'))
        validatorsArr.push(Validators.minLength(Number(keySplitted[1].trim())));
      if (key.includes('pattern'))
        validatorsArr.push(Validators.pattern(keySplitted[1].trim()));
      if (key.includes('email')) validatorsArr.push(Validators.email);
      if (key === 'min')
        validatorsArr.push(Validators.min(Number(keySplitted[1].trim())));
      if (key === 'max')
        validatorsArr.push(Validators.max(Number(keySplitted[1].trim())));
    });

    return validatorsArr;
  }

  getFormDefaultImage(): string {
    return this.model === 'tournament'
      ? '../../../../../assets/icons/default-tournament-logo.svg'
      : '../../../../../assets/icons/person.svg';
  }

  setControlInvalidStyle(controlName: string) {
    return (
      this.dynamicForm.get(controlName).touched &&
      this.dynamicForm.get(controlName).invalid
    );
  }

  getMultiSelectPlaceholder(item: any) {
    return this.dynamicForm.get(item.key).value.length === 0
      ? item.title
      : null;
  }

  onDragAndDropEvent(e: any) {
    if (this.dynamicForm.controls['teams'])
      this.dynamicForm.controls['teams'].setValue(e);
  }
}
